export default class State {
	static filters = [
	'Emergency Shelter',
	'Medical Resource',
	'Outreach Program',
	'Food Pantry',
	'Event',
	"Prepared Meals",
	"Personal Care",
	"Addiction Recovery",
	"Education and Legal Service",
	"Housing Service",
	"Employment Service",
	"Veteran Service"];

	static subscribers = [];

	static subscribe(component){
		State.subscribers.push(component)
	}

	static notify(){
		State.subscribers.forEach((sub) => {sub.handleUpdate(State.filters)})
	}

	static changeFilters(filters){
		State.filters = filters
		State.notify()
	}
}