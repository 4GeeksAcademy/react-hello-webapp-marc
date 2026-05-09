import { useState } from "react"
import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	const [search, setSearch] = useState("")
	const [showModal, setShowModal] = useState(false)

	const searchContact = () => {

		const filtered = store.contacts.filter((contact) =>
			contact.name.toLowerCase().includes(search.toLowerCase())
		)

		if (filtered.length > 0) {

			dispatch({
				type: "filter_contacts",
				payload: filtered
			})

		} else {

			setShowModal(true)

			dispatch({
				type: "filter_contacts",
				payload: []
			})
		}
	}

	const resetSearch = () => {

		setSearch("")

		dispatch({
			type: "filter_contacts",
			payload: []
		})
	}

	return (

		<>

			<nav className="navbar navbar-dark bg-dark shadow-sm py-3">

				<div className="container d-flex justify-content-between align-items-center">

					<Link
						to="/"
						className="navbar-brand fw-bold fs-3 text-white text-decoration-none"
					>
						 Lista de Contactos
					</Link>

					<div className="d-flex gap-2">

						<input
							type="text"
							className="form-control rounded-pill"
							placeholder="Buscar contacto..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}

							onKeyDown={(e) => {
								if (e.key === "Enter") {
									searchContact()
								}
							}}
						/>

						<button
							className="btn btn-light rounded-pill px-4 fw-semibold"
							onClick={searchContact}
						>
							Buscar
						</button>

						<button
							className="btn btn-outline-light rounded-pill"
							onClick={resetSearch}
						>
							Todos
						</button>

					</div>

				</div>

			</nav>

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
								❌ Usuario no encontrado
							</h3>

							<button
								className="btn btn-dark rounded-pill px-4"
								onClick={() => setShowModal(false)}
							>
								Cerrar
							</button>

						</div>

					</div>
				)
			}

		</>
	)
}