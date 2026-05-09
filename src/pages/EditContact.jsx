import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const EditContact = () => {

    const { id } = useParams()

    const navigate = useNavigate()
    const { store } = useGlobalReducer()
    console.log(store.contacts)

    const [contact, setContact] = useState({
        name: "",
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

    const updateContact = async () => {

        try {

            await fetch(
                `https://playground.4geeks.com/contact/agendas/marc_contacts/contacts/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(contact)
                }
            )

            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const foundContact = store.contacts.find(
           (item) => item.id === parseInt(id)
        )

        if (foundContact) {

            setContact({
                name: foundContact.name || "",
                phone: foundContact.phone || "",
                email: foundContact.email || "",
                address: foundContact.address || "",
                agenda_slug: "marc_contacts"
            })
        }

    }, [store.contacts, id])

    return (
        <div className="container mt-5">

            <h1>Editar contacto</h1>

            <input
                className="form-control mb-3"
                type="text"
                name="name"
                value={contact.name}
                onChange={handleChange}
            />

            <input
                className="form-control mb-3"
                type="text"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
            />

            <input
                className="form-control mb-3"
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
            />

            <input
                className="form-control mb-3"
                type="text"
                name="address"
                value={contact.address}
                onChange={handleChange}
            />

            <button
                className="btn btn-primary"
                onClick={updateContact}
            >
                Actualizar contacto
            </button>

        </div>
    )
}