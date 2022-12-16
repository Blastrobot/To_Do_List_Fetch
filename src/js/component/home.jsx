import React, { useEffect, useState } from "react";

// Método que me explico José, main differences en el uso de la función addTask y en el 2. fetch de la función getFetchTask
// Corrige así además el bug, de que borraba aleatoriamente tasks de mi base de datos al eliminarlas & cada vez que hacía un GET en Postman me devolvía distintos valores

const Home = () => {
	
	const [list, setList] = useState([]); // primer useState donde voy a trabajar con los componentes que se guardan en mi lista
	const [input, setInput] = useState(""); // segundo useState donde voy a trabajar con los componentes que introduzco en mi submit/caja/inputbox
	
	// GET FETCH FUNCTION
	const getFetchTask = () => {
		const URL = "https://assets.breatheco.de/apis/fake/todos/user/blastronaut"; //donde va a ir el fetch
		const request = {
			method: "GET",
			redirect: "follow"
		};
		fetch(URL, request)
			.then(response => response.json()) //then es metodo del fetch, response es una variable que le doy yo nombre, json es una función que recoje mis datos del response
			.then(result => {setList(result)})
			.catch(error => console.log("Error", error))
	};

	// PUT FETCH FUNCTION
	const putFetchTask = (lista) => {
		console.log(lista);
		const URL = "https://assets.breatheco.de/apis/fake/todos/user/blastronaut";
		const request = {
			method: "PUT",
			headers: { 
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(lista), // como la base de datos no reconoce el formato de array que le envío, se "traduce" mediante este stringify para que así la base de datos lo cambie y entienda
		};
		fetch(URL, request)
			.then(response => response.json())
			.then(result => {getFetchTask(); console.log("Alles gut", result)})
			.catch(error => console.log("No carga", error))
	};

	// función addTask que será llamada cuando clique en el add button o cuando presione enter, mediante el onSubmit, línea 76
	const addTask = (event) => {
		event.preventDefault();
		if (input === ""){
			return
		}
		else {
			putFetchTask([...list, {"label": input, "done": false}]);

			// clear input task
			setInput ("");
		}

	};

	const deleteTask = (i) => {
		const newArray = list.filter((value, index) => {
			return index == i ? null : value
			// return indice =! i ? value : index; esto es lo mismo pero planteándo el ternario a la inversa para que de el mismo resultado
		})
		putFetchTask(newArray);
	};

	// Llamando al useEffect, para que me devuelva el getFetchTask, cada vez que recargo la app/web
	useEffect(() => {
		getFetchTask()
	}, []);

return (
	<div className="whole-container">
		<div className="title"> {/* Header */}
			<h2>To do list</h2>
			<h5>Keeping track of my tasks</h5>
		</div>
		<div className="task-container"> {/* Whole page div */}
			<div className="add-task"> {/* Input box + Button */}
				<form onSubmit={addTask}>
					<input type="text" placeholder="Write down a task" onChange={(e) => setInput(e.target.value)} value={input}/>
					<button type="submit">Add</button>	
				</form>
			</div>
			<div className="task-list"> {/* Lista donde se guardan todos mis inputs */}
			{list.map((task, i) => {
				return (
					<li key={i} className="todo">
						<ul>{task.label}</ul>
						<div className="todo-actions">
							<i className="fa-solid fa-xmark delete" onClick={() => deleteTask (i)}></i>
						</div>
					</li>
				)})}
			{list.length ? <span>{list.length} item left</span> : <span>No tasks! Add a task</span>}
			</div>
		</div>
		<div className="footer"> {/* Footer */}
			<p>Copyright &copy; <a href="https://github.com/blastrobot" target="_blank">Blastronaut</a></p>
		</div>
	</div>
);
};

export default Home;