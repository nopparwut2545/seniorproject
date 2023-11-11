import React from 'react'
import Link from 'next/link';
type Props = {}

export default function SignUp_Login({}: Props) {
  return (
    <div>
    <h2>Choose Your login Type</h2>
    <Link href="/login-user"><button>Customer</button></Link>
    <br/>
    <Link href="/login-admin"><button>Admin</button></Link>
    <br/>
    <Link href="/login-nanny"><button>Nanny</button></Link>
    <br/>
    <Link href="/sign-up-register"><button> Didn’t Have any account </button></Link>
</div>
  )
}