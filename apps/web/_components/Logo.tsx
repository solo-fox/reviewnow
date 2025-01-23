import Image from "next/image"

export default function Logo() {
  return (
    <Image alt="reviewnow logo" src="/logo.png" width={100} height={179} priority  />
  )
}