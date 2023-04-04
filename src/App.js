import {
	RoutesApp,
} from "./routes"
import Layout from "./components/Layout/Layout"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<div className="app" >
			<ToastContainer position='top-right' />
			<Layout >
				<RoutesApp />
			</Layout >
		</div >
	)
}

export default App
