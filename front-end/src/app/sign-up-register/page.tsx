import React from 'react'
import Link from 'next/link';
type Props = {}

export default function SignUp_Register({}: Props) {
  return (
    <div>
    <h2>Choose Your Registration Type</h2>
    <Link href="/register-user"><button>Customer</button></Link>
    <br/>
    <Link href="/register-admin"><button>Admin</button></Link>
    <br/>
    <Link href="/register-nanny"><button>Nanny</button></Link>
    <br/>
    <Link href="sign-up-login"><button>If you already have an account</button></Link>
</div>
  )
}