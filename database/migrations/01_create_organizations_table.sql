/*auth.users
|
+--> organizations (1-to-many)
      |
        +--> projects (1-to-many)
                |
                +--> project_reviewers (many-to-many with reviewers)
                |        |
                |        +--> reviewers
                |
                +--> reviews (1-to-many with reviewers and projects)


*/
-- Users Table (auth.users is already managed by Supabase)

-- Organizations Table
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster lookup based on user_id
CREATE INDEX idx_organizations_user_id ON organizations (user_id);

-- Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    org_id INT NOT NULL REFERENCES organizations (id) ON DELETE CASCADE ON UPDATE CASCADE,
    name TEXT NOT NULL,
    api_key TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster lookup based on org_id
CREATE INDEX idx_projects_org_id ON projects (org_id);

-- Reviewers Table
CREATE TABLE reviewers (
    id SERIAL PRIMARY KEY,
    email TEXT,
    name TEXT,
    password TEXT, -- Optional password for reviewers to access their reviews
    review_count INT DEFAULT 0, -- Counts how many times the reviewer has reviewed
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects-Reviewers (Many-to-Many Relationship Table)
CREATE TABLE project_reviewers (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects (id) ON DELETE CASCADE ON UPDATE CASCADE,
    reviewer_id INT NOT NULL REFERENCES reviewers (id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects (id) ON DELETE CASCADE ON UPDATE CASCADE,
    reviewer_id INT NOT NULL REFERENCES reviewers (id) ON DELETE CASCADE ON UPDATE CASCADE,
    rating INT CHECK (rating >= 0 AND rating <= 5), -- Rating must be between 0 and 5
    likes BOOLEAN DEFAULT FALSE,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for faster lookups
CREATE INDEX idx_reviewers_email ON reviewers (email);
CREATE INDEX idx_project_reviewers_project_id ON project_reviewers (project_id);
CREATE INDEX idx_project_reviewers_reviewer_id ON project_reviewers (reviewer_id);
CREATE INDEX idx_reviews_project_id ON reviews (project_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews (reviewer_id);

-- Enable Row-Level Security (RLS) on all tables
-- RLS for organizations
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Policy to allow only the organization owner to access their data
CREATE POLICY "Organizations owned by user" ON organizations
FOR ALL USING (auth.uid() = user_id);

-- RLS for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy to allow access to projects under the user's organization
CREATE POLICY "Projects under user organizations" ON projects
FOR ALL USING (
    org_id IN (SELECT id FROM organizations WHERE user_id = auth.uid())
);

-- RLS for reviewers
ALTER TABLE reviewers ENABLE ROW LEVEL SECURITY;

-- Policy to allow access to reviewers based on their credentials or associations
CREATE POLICY "Reviewers self access" ON reviewers
FOR ALL USING (auth.uid() IS NOT NULL);

-- RLS for project_reviewers
ALTER TABLE project_reviewers ENABLE ROW LEVEL SECURITY;

-- Policy to allow access to project-reviewer relationships under user's projects
CREATE POLICY "Project-reviewer relationships under user projects" ON project_reviewers
FOR ALL USING (
    project_id IN (SELECT id FROM projects WHERE org_id IN (SELECT id FROM organizations WHERE user_id = auth.uid()))
);

-- RLS for reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy to allow reviewers to access their reviews
CREATE POLICY "Reviews owned by reviewers" ON reviews
FOR ALL USING (
    reviewer_id IN (SELECT id FROM reviewers WHERE auth.uid() IS NOT NULL)
);

