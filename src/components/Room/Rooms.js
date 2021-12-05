import  React, {Component } from "react";
//import "./Film.css";
import "bootstrap/dist/css/bootstrap.css";
import Room from "./Room";
import { Table, Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import nextId from "react-id-generator";
import RoomClass from "../../class/FilmClass";
import EditForm from "../../forms/EditForm"
import DeleteForm from "../../forms/DeleteForm"
import AddRoom from  "../../AddRoom"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomList: [
       new FilmClass(parseInt(nextId().slice(2)),  1,  24 ),
       new FilmClass( parseInt(nextId().slice(2)),  2,  9 ),
        new FilmClass( parseInt(nextId().slice(2)),  3,  13 ),
        new FilmClass( parseInt(nextId().slice(2)),  4,  9 ),
      ],
    };
  }


  createNotification(message) {
    NotificationManager.success('Success', message);
  }

  showDeleteForm = (id) => {
    const { roomList } = this.state;
    var index = roomList.findIndex(function (value) {
      return value.id === id;
    });

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteForm index={index} onClose={onClose} deleteFilm={this.deleteFilm} />
        );
      }
    });
  }

  showEditForm = (id) => {
    const { roomList } = this.state;
    var index = roomList.findIndex(function (value) {
      return value.id === id;
    });

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <EditForm roomList={roomList} index={index} onClose={onClose} editRoom={this.editRoom} />
            <NotificationContainer />
          </div>
        );
      }
    });
  }

  onChange(e) {
    var name = e.target.id;
    this.setState({
      [name]: e.target.value
    });
  }

  changeTable() {
    this.setState(state => {
      let show = state.showRooms
      return { showRooms: !show }
    });
  }
  
  addRoom = (s) => {
    this.setState(state => {
      var films = state.RoomList;
      var id = state.RoomList.length + 1;
      let newRoom = new RoomClass(id, s.space, s.spaceLeft);
      films.push(newRoom);
      return { RoomList: Rooms }
    });
  }

  editRoom = (index, s) => {
    this.setState(state => {
      var films = state.roomList;
      films[index].space = s.editSpace;
      films[index].spaceLeft = s.editSpaceLeft;

      return { filmList: films }
    });
    this.createNotification('Room was edited successfully');
  }

  deleteRoom = (index) => {
    this.setState(state => {
      var films = state.roomList;
      films.splice(index, 1);
      return { roomList: rooms }
    });
  }




  render() {
    
   
    return (
      <div>
        <h3>List of rooms</h3>
        <Table striped bordered>
          <thead>
            <tr>
              <th>id</th>
              <th>Space</th>
              <th>SpaceLeft</th>
              <th>Actions</th>
            </tr>

            {this.state.roomList.map((room, key) => {
              return (
                <Room
                  key={key}
                  id={room.id}
                  title={room.title}
                  duration={room.duration}
                  showEditForm={this.showEditForm}
                  showDeleteForm={this.showDeleteForm}
                />
              );
            })}
          </thead>
          <tbody></tbody>
        </Table>
        <AddFilm addRoom = {this.addRoom }/>
      </div>
    );
  }
}
export default Rooms;
