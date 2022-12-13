import { element } from "prop-types";
import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	
	const [list, setList] = useState([]);
	const [input, setInput] = useState("");
	
	// GET FETCH FUNCTION
	const getFetchTask = () => {
		const URL = "https://assets.breatheco.de/apis/fake/todos/user/blastronaut"; //donde va a ir el fetch
		const request = {
			method: "GET",
			redirect: "follow"
		};
		fetch(URL, request)
			.then(response => response.json()) //then es metodo del fetch, response es una variable que le doy yo nombre, jason es una función que recoje mis datos del response
			.then(result => {result.map((element) => {setList((e) => [...e, element.label]);})})
			// .then(result => { result.map( (item) => {setList((e) => [...e, item.label]);})}) //creo un nuevo parametro e, y luego le asigno un valor nuevo con element.label
			.catch(error => console.log("Error", error))
	};

	// PUT FETCH FUNCTION
	const putFetchTask = (lista) => {
		const URL = "https://assets.breatheco.de/apis/fake/todos/user/blastronaut";
		const request = {
			method: "PUT",
			header: { 
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(lista),
		};
		// alert (lista[5].label); una alerta para ver si me devolvia el parametro lista que le pasaba, en este caso me devuelve el nuevo item que le escribo
		fetch(URL, request)
			.then(response => response.json())
			.then(result => console.log("Alles gut", result))
			.catch(error => console.log("No carga", error))
	};

	// PUT FETCH FUNCTION ASYN METHOD
	// const putFetchTask = async (lista) => {
	// 	const URL = "https://assets.breatheco.de/apis/fake/todos/user/blastronaut";
	// 	const request = {
	// 		method: "PUT",
	// 		header: { 
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(lista),
	// 	};
	// 	const response = await fetch(URL, request);
	// 	const result = await response.json();
	// };

	const addTask = (event) => {
		event.preventDefault();
		if (input === ""){
			return
		}
		else { // enviando mi nuevo task a mi lista de tareas
			// generar el array que le vamos a enviar a fetch
			const nuevaLista = [];
			// { label: "tarea nueva", done: false } -> ejemplo de cada elemento del array que quiero
			for (let i = 0; i < list.length; i++) {
				const element = list[i];
				let item = {};
				// 	"label": {element},
				// 	"done": false
				// }; definiendo un objeto del elemento item
				item["label"] = element; //creando un objeto como en la linea 26 con la propiedad label
				item["done"] = false; //creando otro objeto como en la linea 26 con la propiedad done
				nuevaLista.push(item); // actualizo mi nuevo array con los nuevos items que he declarado, cada elemento tiene un objeto
			};
			nuevaLista.push({"label": input, "done": false});
			// alert (nuevaLista[nuevaLista.length - 1].label);
			
			// debugger;
			
			// let newitem = {};
			// newitem[label] = input;
			// newitem[done] = false;
			// nuevaLista.push(newitem);
	
			// envio el new array al fetch
			putFetchTask(nuevaLista);
	
			// clear input task
			setInput ("");
			setList([...list, input]);
		}

	};

	const deleteTask = (i) => {
		const newList = [...list];
		newList.splice(i, 1);
		setList(newList);
	};

	//use effect
	useEffect(() => {
		getFetchTask()
	}, []);

return (
	<div className="whole-container">
		<div className="title">
			<h2>To do list</h2>
			<h5>Keeping track of my tasks</h5>
		</div>
		<div className="task-container">
			<div className="add-task">
				<form onSubmit={addTask}>
					<input type="text" placeholder="Write down a task" onChange={(e) => setInput(e.target.value)} value={input}/>
					<button type="submit">Add</button>	
				</form>
			</div>
			<div className="task-list">
			{list.map((task, i) => {
				return (
					<li key={i} className="todo">
						<ul>{task}</ul>
						<div className="todo-actions">
							<i className="fa-solid fa-xmark delete" onClick={() => deleteTask (i)}></i>
						</div>
					</li>
				)})}
			{list.length ? <span>{list.length} item left</span> : <span>No tasks! Add a task</span>}
			</div>
		</div>
		<div className="footer">
			<p>Copyright &copy; <a href="https://github.com/blastrobot" target="_blank">Blastronaut</a></p>
		</div>
	</div>
);
};

export default Home;