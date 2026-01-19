import { useAuth } from "../context/auth.context"
import { useForm } from "../hooks/useForm"


const LogIn = () => {
    const { logIn } = useAuth()

    const [formData, handleChange] = useForm({
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        logIn(formData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LogIn
