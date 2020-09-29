import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './default.css';
import './fonts.css';
declare var db: any;
declare var client: any;

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  
  render() { 
    return (<div>
      <div id="header-wrapper">
  <div id="header" className="container">
    <div id="logo">
      <h1><a href="#">FaceBook</a></h1>
      </div>
      <div className="App-user" style={{ backgroundImage:  "url(" + this.props.user.imgs[this.props.user.img].url + ")"  }}> </div>
      <p style={{textAlign: 'center', color: 'white', fontSize: 20, textTransform: 'uppercase'}}> {this.props.user.name + ' ' + this.props.user.surname} </p>
        
  <div id="portfolio" className="container">
    <div className="column1">
      <div className="box">
        <a href="#" className="button new-button" onClick={() => this.props.updateParent({loggedUser: undefined})}>Homepage</a> </div>
    </div>
    <div className="column2">
      <div className="box">
        <a href="#" className="button new-button" onClick={() => this.setState({ view: 'COMMENTS' })}>Comments</a> </div>
    </div>
    <div className="column3">
      <div className="box">
        <a href="#" className="button new-button" onClick={() => this.setState({ view: 'FRIENDS' })}>Friends</a> </div>
    </div>
    <div className="column4">
      <div className="box">
        <a href="#" className="button new-button" onClick={() => this.setState({ view: 'PHOTOS' })}>Photos</a> </div>
</div>

      
    </div>
  </div>
</div>

<div id="wrapper3">
  <div id="portfolio" className="container">
    <div className="column1">
      <div className="box">
        <a href="#" className="button button-small" onClick={() => this.setState({ view: 'ADD_COMMENT' })}>Add Comments</a> </div>
    </div>
    <div className="column3">
      <div className="box">
        <a href="#" className="button button-small" onClick={() => this.setState({ view: 'ADD_PHOTOS' })}>Add Photos</a> </div>
    </div>
  </div>
</div>


<div id="wrapper3">
  {
    this.state.view === 'PHOTOS' &&
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    {
      this.props.user.imgs.map((img, i) => (
        <div key={i} style={{ flex: 1 }}>
          <div style={{display:'flex', flexDirection: 'column'}}>
            <img style={{ width: 250, height:250}} src={img.url}> 
            </img>
            <p style={{flex:1}}> {`${img.likeCount} likes`}</p>
            <a href="#" className="button button-small" style={{width:125}} onClick={() => {
              db.collection('users').updateOne(
              {
                id: this.props.user.id,
              },
              {
                $set: {
                  "imgs" : this.props.user.imgs.slice(0, i)
                  .concat({likeCount: img.likeCount+1, url: img.url})
                  .concat(this.props.user.imgs.slice(i+1))
                 },
              }
              ).then(this.props.getUsers);
            }}>Like it</a>
            <hr/>
            {!this.props.visitor && <a href="#" className="button button-small" style={{width:125}} onClick={() => {
              db.collection('users').updateOne(
              {
                id: this.props.user.id,
              },
              {
                $set: {
                  "img" : i
                 },
              }
              ).then(this.props.getUsers);
            }}>Make it pp</a>}
          </div>
        </div>
      ))
    }
    </div>
  } {
    this.state.view === 'ADD_PHOTOS' &&
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    {
      !this.props.visitor &&
      <div style={{ flex: 1 }}>
        <div style={{display:'flex', flexDirection: 'column'}}>
          <input id="imageAdd" type="text" className="text" name="name" placeholder="Add Photo Url" />
          <a href="#" className="button button-small" style={{width:50, margin:50}} onClick={() => {
            db.collection('users').updateOne(
            {
              id: this.props.user.id,
            },
            {
              $set: {
                "imgs" : this.props.user.imgs.concat({
                  likeCount: 0,
                  url: document.getElementById('imageAdd').value,
                })
               },
            }
            ).then(this.props.getUsers);
          }}>Add</a>
        </div>
      </div>
    }
    </div>
  }
{/* comentleri yap freindleri yap*/}

  {
    this.state.view === 'COMMENTS' &&
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    {
      this.props.user.comments.map((comment, i) => (
        <div key={i} style={{ flex: 1 }}>
          <div style={{display:'flex', flexDirection: 'column'}}>
            <h2>
              {
                comment.comment
              }
            </h2>
            <p style={{flex:1}}> {`${comment.likeCount} likes`}</p>
            <a href="#" className="button button-small" style={{width:100, margin:50}} onClick={() => {
              db.collection('users').updateOne(
              {
                id: this.props.user.id,
              },
              {
                $set: {
                  "comments" : this.props.user.comments.slice(0, i)
                  .concat({likeCount: comment.likeCount+1, comment: comment.comment})
                  .concat(this.props.user.comments.slice(i+1))
                 },
              }
              ).then(this.props.getUsers);
            }}>Like it</a>
            <hr/>
          </div>
        </div>
      ))
    }
    </div>
  }

  {
    this.state.view === 'ADD_COMMENT' && 
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    {!this.props.visitor &&
      <div style={{ flex: 1 }}>
        <div style={{display:'flex', flexDirection: 'column'}}>
          <input id="commentAdd" type="text" className="text" name="name" placeholder="Add Comment" />
          <a href="#" className="button button-small" style={{width:100, margin:50}}  onClick={(() => {
                      db.collection('users').updateOne(
                      {
                        id: this.props.user.id,
                      },
                      {
                        $set: {
                          "comments" : this.props.user.comments.concat({
                            likeCount: 0,
                            comment: document.getElementById('commentAdd').value,
                          })
                         },
                      }
                      ).then(this.props.getUsers);
                    }).bind(this)}>Add</a>
        </div>
      </div>
    }
    </div>
  }

  {
    this.state.view === 'FRIENDS' &&
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    {
      this.props.users.map((friend, i) => (
        <div key={i} style={{ flex: 1 }}>
          <div style={{display:'flex', flexDirection: 'column'}}>
          <img onClick={() => {

            db.collection('users').find().limit(100).execute().then(users => this.props.updateParent(
              {users},
              () => this.props.updateParent({
                loggedUser: this.props.users.filter(a => a.id === friend.id)[0],
                visitor: true,
              })
              ));

          }}
          src={friend.imgs[friend.img].url} style={{ width: 150, height: 150 }}></img>
            <h2>
              {
                friend.name
              }
            </h2>
            <h2>
              {
                friend.surname
              }
            </h2>

            {!this.props.visitor && this.props.user.friends.indexOf(friend.id) >= 0 &&
              <p>this person is already your friend</p>}

            {!this.props.visitor && this.props.user.friends.indexOf(friend.id) < 0 && <a href="#" className="button button-small" style={{width:300}} onClick={() => {
              db.collection('users').updateOne(
              {
                id: this.props.user.id,
              },
              {
                $set: {
                  "friends" : this.props.user.friends.concat(friend.id)
                 },
              }
              ).then(this.props.getUsers);
            }}>Add this person as a friend</a>}
            <hr/>
          </div>
        </div>
      ))
    }
    </div>
  }

</div>

</div>
    );
  }



}

export default App;
