import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddContact = () => {

    const navigate = useNavigate()

    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        agenda_slug: "marc_contacts"
    })

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    const createContact = async () => {

        try {

            const response = await fetch(
                "https://playground.4geeks.com/contact/agendas/marc_contacts/contacts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(contact)
                }
            )
            const data = await response.json()

            console.log(data)

            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mt-5">

            <h1>Añadir contacto</h1>

            <input
                className="form-control mb-3"
                type="text"
                placeholder="Nombre"
                name="name"
                onChange={handleChange}
            />

            <input
                className="form-control mb-3"
                type="text"
                placeholder="Teléfono"
                name="phone"
                value={contact.phone}
                onChange={(e) => {

                    const onlyNumbers = e.target.value.replace(/\D/g, "")

                    setContact({
                        ...contact,
                        phone: onlyNumbers
                    })
                }}
            />

            <input
                className="form-control mb-3"
                type="email"
                placeholder="Email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                pattern=".+@(gmail|hotmail|outlook|yahoo)\.(com|org|net|cat)"
                required
            />

            <input
                className="form-control mb-3"
                type="text"
                placeholder="Dirección"
                name="address"
                onChange={handleChange}
            />

            <button
                className="btn btn-dark w-100 py-2 fw-bold rounded-pill shadow"
                onClick={() => {

                    const emailRegex =
                        /^[^\s@]+@[^\s@]+\.(com|org|net|cat)$/i

                    if (!contact.phone) {
                        alert("Introduce un teléfono")
                        return
                    }

                    if (contact.phone.length < 9) {
                        alert("El teléfono debe tener mínimo 9 números")
                        return
                    }

                    if (!emailRegex.test(contact.email)) {
                        alert("Introduce un email válido")
                        return
                    }

                    createContact()
                }}
            >
                Guardar contacto
            </button>

        </div>
    )
}