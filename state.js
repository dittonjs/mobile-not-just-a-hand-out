export default class State {
	static filters = ['Emergency Shelters', 'Medical Resources', 'Outreach Programs', 'Food Pantries'];
	static subscribers = [];

	static subscribe(component){
		State.subscribers.push(component)
	}

	static notify(){
		console.log(State.filters);
		State.subscribers.forEach((sub) => {sub.handleUpdate(State.filters)})
	}

	static changeFilters(filters){
		State.filters = filters
		State.notify()
	}
}