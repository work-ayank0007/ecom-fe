export default function Navbar() {
    return (
        <div className="w-full">
            <nav className="mx-auto w-10/12 max-w-7xl flex justify-between bg">
                <h1 className=" font-family">BLUEKART</h1>
                <span>
                    <ul className="flex gap-6">
                        <li>Login</li>
                        <li>Register</li>
                    </ul>
                </span>
            </nav>
        </div>
    )
}
