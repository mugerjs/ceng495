import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import Profile from './Profile';
import './App.css';
declare var db: any;
declare var client: any;

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      visitor: false,
    };
  }

  getUsers() {
    db.collection('users').find().limit(100).execute().then(users => this.setState(
      {users},
      () => this.state.loggedUser && this.setState({
        loggedUser: this.state.users.filter(a => a.id === this.state.loggedUser.id)[0],
      })
      ));
  }

  componentWillMount() {
    db.collection('users').find().limit(100).execute().then(users => this.setState({users}))
  }

  render() {
    console.log(this.state.users)

    if (this.state.loggedUser)
      return (<Profile
              visitor={this.state.visitor}
              user={this.state.loggedUser}
              users={this.state.users}
              updateParent={this.setState.bind(this)}
              getUsers={this.getUsers.bind(this)}
            />);

    return (
      <div className="App">
        <header className="App-header">
          <div id="logo">
            <h1><a href="#">FaceBook</a></h1>
          </div>
        </header> 

      <div id="wrapper5">
        <div id="portfolio" className="container">
        <div className="column1">
          <div className="box">
            <a href="#" className="button button-small">Add Account</a> </div>
          </div>
          <div className="column3" style={{ marginLeft: 144 }}>
          <div className="box">
            <a href="#" className="button button-small">Remove Account</a> </div>
          </div>
          <div className="column4">
          <div className="box">
            <a href="#" className="button button-small">Login</a> </div>
          </div>
        </div>
      </div>

      <div id="wrapper2">
      <div style={{ display: 'flex' }}>
        <div id="newsletter" className="container" style={{ flex:1 }}>
          <div className="content" style={{ width: '80%', margin: '5%' }}>
            <form method="post" action="#">
                <div>
                  <input id="name" type="text" className="text" name="name" placeholder="Name" />
                  <input id="surname" type="text" className="text" name="surname" placeholder="Surname" />
                  <input id="age" type="text" className="text" name="age" placeholder="Age" />
                  <input id="email" type="text" className="text" name="email" placeholder="Email" />
                  <a href="#" className="button button-small" onClick={
                    (() => {
                                          db.collection('users').insertOne({
                                            id: Math.random() * 1000000 | 0,
                                            name: document.getElementById('name').value,
                                            surname: document.getElementById('surname').value,
                                            age: document.getElementById('age').value,
                                            email: document.getElementById('email').value,
                                            img: 0,
                                            imgs: [
                                              {likeCount: 0, url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwsHBhANEREODQ8OEA8VEQ8PEA8NFQ0PFRIXFhkRExMYHSgsJBomHRUVLT0iJikuLi4uGB8zODMtNygtLisBCgoKDg0OFhAQDi0ZFRkrLSsrKy0tKzcrKy0tLTcrNy0rLSsrKysrKzcrKy0rKysrKy0rKystKysrKysrKysrK//AABEIAH4AyAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYCB//EADYQAQABAgMECAMGBwAAAAAAAAABAhEDBCEFQVFhEjFxgZGxwdEigqETMmKisvEVIzM0QlJy/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAIBAwT/xAAcEQEBAQEBAAMBAAAAAAAAAAAAAQIRMSFBURL/2gAMAwEAAhEDEQA/APowD0OYAAAAAAAAPVFFWJVaImZndGqdgbLrqq+L4I04VTPLrZbI1Xi6/hGFb71f5fZFx9l4lEXpnpxwt0Z8Gf3DivGZiaZtOk+FmFMAAAAAAAAAAAAAAAAAAGaaZqqiI1mbW5zLCZsqjpZyPwxM+nnMMt5Oti1yWVpy2Fb/ACnrnjPskyDhb1bIAIG0spGNh9KI+On80Ru7VG6tzOao+zzNVO6KptHK+n0dMX6TpqAdEgAAAAAAAAAAAAAAACx2JH8+qfw+cx7K5a7DjWv5fVOvGz1bAOKwABz21Itnq/l/TDoVFtiLZztpj1j0Xj1mkEB1QAAAAAAAAAAAAAAAALrYtFsvM8avpER7ypXR5LD+yytNO+2vbOs+aN+NiQA5LAAFPtyi2JTVxiY8Jv6rhB2vh9PKX30zE93VPn9G59ZVEA7oAAAAAAAAAAAAAAAAbspRGJmaYm0ReL30vbd3+rpXKxok4GfxsGevpRwq18JRrPVSugEXJZ2nN3i0xMWvfWO6UqXLxTIADXixTOFMVWiJib7tJ5oec2jGXrmiImaotyiLxdV4+bxcfrqm3CNI8PdUzazrVVT0apjSbTOsa35w8g7IAAAAAAAAAAAAAAAAAbMDBrx6+jTF5690Wjv7S0Ttif16v+Y81yg7NylWWoq6Vr1THVraI/eU5x1flcAEtUG1f76r5f0whrnaWSrx8SK6bTNrTE6dXVKoxKJw65pnSY6+TtmzkRXkBTAAAAAAAAAAAAAHvBwqsavo0xefKOMg8PVFFWJVaImZ5arbL7Kpp1rnpTwjSPFYYeHTh02piIjloi7/ABXFRl9lV161z0Y4RrKzy+Xw8vTamLcZ65ntlvHO6tbwAY0ABiEbNZLDzOsxaf8AaNJ70lk6KLH2Zi4WtPxxy0nw9kKqmaZtN4nnpZ1TVi4FGNFqoie3d2SubqblzItsxsnfRPyz6T7quuirDqmJiYmNzpNSseQGsAAAAAAAAZiJqm2/zl0OTy0ZbBtvnrnjKo2ZhxXnKeV574dA57qswAc1AAAAAAAAAAMbkPaWWjHwbx96mJtzjfCaEvByg25qj7PMVU7oqm3JqeiVzAAAAf/Z"},
                                            ],
                                            friends: [
                                            ],
                                            comments: [
                                            ],
                                          });
                                          document.getElementById('name').value = '';
                                          document.getElementById('surname').value = '';
                                          document.getElementById('age').value = '';
                                          document.getElementById('email').value = '';
                                          this.getUsers();
                                        }).bind(this)
                  }>Submit</a>
                </div>
            </form>
          </div>
        </div>
        <div style={{ flex:1 }}>
          { 
            this.state.users.map(user => (
              <div 
                onClick={
                  (() => {
                                      db.collection('users').deleteOne({
                                        id: user.id,
                                      });
                                      this.getUsers();
                                    }).bind(this)
                }
              >
                <div className="App-user" style={{ width:50, height:50, backgroundImage:  "url(" + user.imgs[user.img].url + ")" }}> 
                  {/*<img src={user.img} style={{ width: 30, height: 30 }}/>*/}
                </div>
                <p style={{ fontSize: 20, textTransform: "uppercase"}}>{`${user.name} ${user.surname}`}</p>
              </div>
            ))
          }
        </div>
        <div style={{ flex:1 }}>
          { 
            this.state.users.map(user => (
              <div 
                onClick={
                 ( () => {
                                     this.setState({
                                       loginId: user.id,
                                       loggedUser: user,
                                     });
                                   }).bind(this)
                }
              >
                <div className="App-user" style={{ width:50, height:50, backgroundImage:  "url(" + user.imgs[user.img].url + ")" }}> 
                  {/*<img src={user.img} style={{ width: 30, height: 30 }}/>*/}
                </div>
                <p style={{ fontSize: 20, textTransform: "uppercase"}}>{`${user.name} ${user.surname}`}</p>
              </div>
            ))
          }
        </div>

      </div>  
</div>

      </div>
    );
  }
}

export default App;
