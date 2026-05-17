import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddContact = () => {

    const navigate = useNavigate()

    const [contact, setContact] = useState({
        full_name: "",
        phone: "",
        email: "",
        address: ""
    })

    const handleChange = (e) => {

        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    const createContact = () => {

        const savedContacts =
            JSON.parse(localStorage.getItem("contacts")) || []

        const newContact = {
            ...contact,
            id: Date.now()
        }

        savedContacts.push(newContact)

        localStorage.setItem(
            "contacts",
            JSON.stringify(savedContacts)
        )

        navigate("/")
    }

    return (

        <div className="container mt-5">

            <h1 className="fw-bold mb-4">
                Añadir contacto
            </h1>

            <input
                className="form-control mb-3"
                type="text"
                placeholder="Nombre"
                name="full_name"
                value={contact.full_name}
                onChange={handleChange}
            />

            <input
                className="form-control mb-3"
                type="text"
                placeholder="Teléfono"
                name="phone"
                value={contact.phone}
                onChange={(e) => {

                    const onlyNumbers =
                        e.target.value.replace(/\D/g, "")

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
            />

            <input
                className="form-control mb-4"
                type="text"
                placeholder="Dirección"
                name="address"
                value={contact.address}
                onChange={handleChange}
            />

            <button
                type="button"
                className="btn btn-dark w-100 py-2 fw-bold rounded-pill shadow"

                onClick={() => {

                    const emailRegex =
                        /^[^\s@]+@[^\s@]+\.(com|org|net|cat)$/i

                    if (!contact.full_name.trim()) {
                        alert("Introduce un nombre")
                        return
                    }

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

                    if (!contact.address.trim()) {
                        alert("Introduce una dirección")
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