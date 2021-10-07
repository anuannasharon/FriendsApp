import './Friend.scss';

function Friend({friend, deleteEvent, doFavourite}) {
return(
	<div className="friend d-flex justify-content-between p-3">
		<label>{friend.name} </label>
		<div className="actions d-flex justify-content-between">
		  <i className={`bi ${ friend.favourite ? 'bi-star-fill': 'bi-star' }`} onClick={ () => doFavourite(friend) }></i>
		  <i className="bi bi-trash" onClick={ () => deleteEvent(friend.id) }></i>
		</div>
	</div>
	)
}
export default Friend;