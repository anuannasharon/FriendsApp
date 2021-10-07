import React, { useState, useEffect } from 'react';
import './App.scss';
import Friend from './Components/Friend';

function App() {
  
  const [friend, setFriend] = useState('');
  const [searching, setSearching] = useState(0);
  const [searchedData, setSearchedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [friends, setFriends] = useState([]);
  const [filteredData, setFilteredDataData] = useState([]);
  
  useEffect(() => {
    if(!friend) {
      setSearching(0)
    }

  },[friend]);

  useEffect(() => {
    const {firstIndex, lastIndex} = getIndex();
    setFilteredDataData(friends.slice(firstIndex, lastIndex))
  },[currentPage]);

  useEffect(() => {
    if(searching){
      const data = friends.filter(c=>{ 
        return c.name.includes(friend);
      })
      setSearchedData(data);
      setFilteredDataData(data.slice(0, 4))
   } else {
     setFilteredDataData(friends.slice(0, 4));
   }
  },[searching]);

  useEffect(() => {
    const {firstIndex, lastIndex} = getIndex();
    setFilteredDataData(friends.slice(firstIndex, lastIndex))
  },[friends]);

  const handleKeyDown = (e) => {
   if (e.key === 'Enter') {
      if(e.target.value) {
        const id = Date.parse(new Date());
        setFriends((prev) => ([...prev,...[{id, name:e.target.value, favourite: false}]]));
        setFriend('');
      }
    }
  }

  const sortEvent = (sort) => {
    const val = sort ? 1: -1
    const data = searching ? searchedData : friends; 
    const sortedData = data.sort((a,b)=> a.favourite.toString() > b.favourite.toString() ? 1*val: -1*val);
    setCurrentPage(1);
    setFilteredDataData([...sortedData].slice(0, 4));
  }

  const updateCurrentPage = (page) =>{
    setCurrentPage(page);
  }

  const deleteEvent = (id) => {
    const noDeleted = friends.filter(c=>c.id !== id);
    setFriends([...noDeleted]);
  }

  const searchFriend = () => {
    setSearching((prev)=> prev+1)
  }

  const doFavourite = (friend) => {
    const updateState = [...friends].map(c=>{
      if(c.id === friend.id){
        c.favourite = !friend.favourite
      }
      return c;
    });
    setFriends(updateState);
  }

  const getTotalItems = () => {
    if(searching) {
      return filteredData.length;
    } else {
      return friends.length;
    }
  }

  const getIndex = () => {
    const firstIndex = (currentPage-1) * 4;
    const lastIndex = 4 + (currentPage-1) * 4;
    return { firstIndex, lastIndex };
  }


  let friendsList = <NoFriend/>
 
  if(filteredData.length) {
     friendsList = filteredData.map((each,index) =>{
         return <Friend key={ index } friend={ each } deleteEvent={ deleteEvent } doFavourite={ doFavourite }/>
     })
   }

  return (
    <div className="friends-container d-flex justify-content-center">
    <div className="card">
      <div className="card-header"><h4>Friends List</h4></div>
      <div className="card-body p-0">
         <div className="d-flex">
           <input required className="form-control input-friend" value={ friend } type="text" placeholder="Enter your friend's name" onChange={(e)=>setFriend(e.target.value)} onKeyDown={ handleKeyDown }/>
           <i className={`bi bi-search ms-1 ${friends.length?'':'disabled'}`} onClick={ searchFriend }></i>
         </div>
         {
           getTotalItems() > 0 && <Sort sortEvent={ sortEvent }/>
         }
         {
           friendsList
         }
         {
           getTotalItems() > 4 && <Paginator page={currentPage} itemPerPage="4" totalItems={ getTotalItems() } updateCurrentPage={ updateCurrentPage } />
         }
      </div>
      </div>
    </div>
    
  );
}


function NoFriend(){
  return(
   <div className="p-2 d-flex justify-content-center bg-light">No Friends</div>
  )
}


function Paginator({page, itemPerPage, totalItems, updateCurrentPage}) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  
  useEffect(() =>{
    const pages = Math.ceil(totalItems/itemPerPage);
    setCurrentPage(1)
    setPages(pages)
  },[totalItems]);

  useEffect(() =>{
    setCurrentPage(page)
  },[page]);

  const nextPage = () =>{
    if(currentPage <= pages) {
      setCurrentPage((prev) => prev+1)
    }
  }

  const previousPage = () =>{
   if(currentPage > 1) {
      setCurrentPage((prev) => prev-1)
    }
  }

  useEffect(()=> {
    updateCurrentPage(currentPage)
  },[currentPage])

  return(
    <nav>
      <ul className="pagination m-0 justify-content-between">
        <li className="page-item">
          <a  className={currentPage === 1 ? 'page-link disabled':'page-link'} href="#" onClick={previousPage}>
            <span>&laquo;</span>
          </a>
        </li>
        <li className="page-item"><a className="page-link" href="#">{currentPage} of { pages } Pages</a></li>
        <li className="page-item">
          <a  className={currentPage === pages ? 'page-link disabled':'page-link'} href="#" onClick={nextPage}>
            <span>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}


function Sort({sortEvent}){
  const [sort, setSort] = useState(false);

  useEffect(() =>{
    sortEvent(sort);
  },[sort])

  return(
    <div className="d-flex justify-content-end sort-cont mt-1 mb-1">
      <i className={`bi ${sort?'bi-sort-up':'bi-sort-down'}`} onClick={()=>setSort(!sort)}></i>
    </div>
  )
}

export default App;
