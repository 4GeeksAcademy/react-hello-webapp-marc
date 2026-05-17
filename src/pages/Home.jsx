import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const [showModal, setShowModal] = useState(false)
	const [selectedId, setSelectedId] = useState(null)

	const getContacts = () => {

		const contacts =
			JSON.parse(localStorage.getItem("contacts")) || []

		dispatch({
			type: "set_contacts",
			payload: contacts
		})
	}

	const deleteContact = (id) => {

		const contacts =
			JSON.parse(localStorage.getItem("contacts")) || []

		const updatedContacts =
			contacts.filter(contact => contact.id !== id)

		localStorage.setItem(
			"contacts",
			JSON.stringify(updatedContacts)
		)

		getContacts()
	}

	useEffect(() => {

		getContacts()

	}, [])

	return (

		<div className="container py-5">

			<Link to="/add-contact">

				<button className="btn btn-dark rounded-pill px-4 py-2 shadow mb-4">
					+ Crear contacto
				</button>

			</Link>

			{
				store.contacts.length === 0 && !store.searchActive && (

					<div
						className="d-flex flex-column justify-content-center align-items-center mt-5"
						style={{ height: "50vh" }}
					>

						<div className="bg-white shadow-lg rounded-4 p-5 text-center">

							<h1 className="display-1 mb-3">
								📭
							</h1>

							<h3 className="fw-bold mb-2">
								No hay contactos todavía
							</h3>

						</div>

					</div>
				)
			}

			{
				store.searchActive &&
				store.filteredContacts.length === 0 && (

					<div
						className="d-flex flex-column justify-content-center align-items-center mt-5"
						style={{ height: "40vh" }}
					>

						<div className="bg-white shadow-lg rounded-4 p-5 text-center">

							<h1 className="display-1 mb-3">
								❌
							</h1>

							<h3 className="fw-bold mb-2">
								No se encontraron contactos
							</h3>

						</div>

					</div>
				)
			}

			{
				(store.searchActive
					? store.filteredContacts
					: store.contacts
				)?.map((contact) => (

					<div
						key={contact.id}
						className="card border-0 shadow-lg rounded-4 p-4 mb-4"
					>

						<div className="d-flex justify-content-between align-items-start">

							<div>

								<h3 className="fw-bold mb-3">
									{contact.full_name}
								</h3>

								<p className="text-secondary mb-2">
									📞 {contact.phone}
								</p>

								<p className="text-secondary mb-2">
									📧 {contact.email}
								</p>

								<p className="text-secondary">
									📍 {contact.address}
								</p>

							</div>

							<div className="d-flex gap-2">

								<button
									className="btn btn-outline-danger rounded-circle"
									onClick={() => {
										setSelectedId(contact.id)
										setShowModal(true)
									}}
								>
									🗑
								</button>

								<Link to={`/edit-contact/${contact.id}`}>

									<button className="btn btn-outline-warning rounded-circle">
										✏️
									</button>

								</Link>

							</div>

						</div>

					</div>

				))
			}

			{
				showModal && (

					<div
						className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
						style={{
							backgroundColor: "rgba(0,0,0,0.5)",
							zIndex: 9999
						}}
					>

						<div className="bg-white p-5 rounded-4 shadow-lg text-center">

							<h3 className="mb-4">
								¿Seguro que quieres eliminar este contacto?
							</h3>

							<div className="d-flex gap-3 justify-content-center">

								<button
									className="btn btn-secondary rounded-pill px-4"
									onClick={() => setShowModal(false)}
								>
									Cancelar
								</button>

								<button
									className="btn btn-danger rounded-pill px-4"
									onClick={() => {
										deleteContact(selectedId)
										setShowModal(false)
									}}
								>
									Eliminar
								</button>

							</div>

						</div>

					</div>
				)
			}

		</div>
	);
};