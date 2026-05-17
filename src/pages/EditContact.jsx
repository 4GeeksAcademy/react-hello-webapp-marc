import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const EditContact = () => {

    const { id } = useParams()

    const navigate = useNavigate()
    const { store } = useGlobalReducer()

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

    const updateContact = () => {

        const contacts =
            JSON.parse(localStorage.getItem("contacts")) || []

        const updatedContacts = contacts.map((item) =>

            item.id === parseInt(id)
                ? { ...contact, id: parseInt(id) }
                : item
        )

        localStorage.setItem(
            "contacts",
            JSON.stringify(updatedContacts)
        )

        navigate("/")
    }

    useEffect(() => {

        const foundContact = store.contacts.find(
            (item) => item.id === parseInt(id)
        )

        if (foundContact) {

            setContact({
                full_name: foundContact.full_name || "",
                phone: foundContact.phone || "",
                email: foundContact.email || "",
                address: foundContact.address || ""
            })
        }

    }, [store.contacts, id])

    return (

        <div className="container mt-5">

            <h1 className="fw-bold mb-4">
                Editar contacto
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
                onChange={handleChange}
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
                className="btn btn-dark w-100 py-2 fw-bold rounded-pill shadow"
                onClick={updateContact}
            >
                Actualizar contacto
            </button>

        </div>
    )
}