import { useAuth } from "../context/auth.context"
import { useForm } from "../hooks/useForm"

const Register = () => {
    const { signup } = useAuth()

    const [formData, handleChange] = useForm({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(formData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
