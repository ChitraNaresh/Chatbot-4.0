import {Component} from 'react'
import {BsThreeDots, BsEmojiSmile} from 'react-icons/bs'
import {BiUserCircle} from 'react-icons/bi'
import {v4 as uuid} from 'uuid'
import EmojiPicker from 'emoji-picker-react'
import {FiUsers} from 'react-icons/fi'
import {BiSend} from 'react-icons/bi'
import './index.css'
import EachMessage from '../EachMessage'
import ShowUsers from '../ShowUsers'

const usersList = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin']

const backgroundUserColors = [
  'background-orange',
  'background-teal',
  'background-green',
  'background-magenta',
  'background-gold',
]
const officesNames = [
  {
    id: 1,
    officeName: 'Poland Office',
  },
  {
    id: 2,
    officeName: 'Introduction',
  },
  {
    id: 3,
    officeName: 'India Office',
  },
]

const user_list = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin']

class ChatPage extends Component {
  state = {
    isMenu: false,
    userMessages: [],
    userInput: '',
    noUsers: false,
    showEmoji: false,
    officesInformation: officesNames,
    initialId: 1,
    officeText: officesNames[0].officeName,
  }

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  onClickMenu = () =>
    this.setState(prevState => ({
      isMenu: !prevState.isMenu,
    }))

  onSendBtn = () => {
    const timeValue = new Date()
    const {userInput} = this.state
    const backgroundColorValue =
      backgroundUserColors[Math.ceil((Math.random() * 8 - 1) / 2)]
    const timeNumValue = timeValue.toLocaleTimeString().split(' ')
    const timeMinutesHours = timeNumValue[0].slice(
      0,
      timeNumValue[0].length - 3,
    )
    const eachMessage = {
      id: uuid(),
      name: user_list[Math.ceil((Math.random() * 8 - 1) / 2)],
      message: userInput,
      backgroundColor: backgroundColorValue,
      likesCount: 0,
      time: timeMinutesHours + ' ' + timeNumValue[1],
    }
    this.setState(prevState => ({
      userInput: '',
      userMessages: [...prevState.userMessages, eachMessage],
    }))
  }

  onClickBtn = idValue =>
    this.setState(prevState => {
      const modifiedCountArr = prevState.userMessages.map(eachUserObj => {
        if (idValue === eachUserObj.id) {
          eachUserObj.likesCount = eachUserObj.likesCount + 1
          return eachUserObj
        }
        return eachUserObj
      })
      return {userMessages: modifiedCountArr}
    })
  renderMessages = () => {
    const {userMessages} = this.state
    return (
      <ul className="each-messages-card">
        {userMessages.map(eachUserMessage => (
          <EachMessage
            eachMessageData={eachUserMessage}
            key={eachUserMessage.id}
            onClickLike={this.onClickBtn}
          />
        ))}
      </ul>
    )
  }

  onClickShow = () =>
    this.setState(prevState => ({
      noUsers: !prevState.noUsers,
    }))

  onClickShowEmoji = () =>
    this.setState(prevState => ({
      showEmoji: !prevState.showEmoji,
    }))

  onClickEmoji = event =>
    this.setState(prevState => ({
      userInput: prevState.userInput + event.emoji,
    }))

  onChangeOffice = (idvalue, officeTextValue) => {
    console.log(idvalue, officeTextValue)
    this.setState({initialId: idvalue, officeText: officeTextValue})
  }

  renderEachUser = userName => (
    <li className="each-user-list">
      <BiUserCircle className="each-user-avatar" />
      <h1 className="user-name-text">{userName}</h1>
    </li>
  )

  render() {
    const {
      userMessages,
      userInput,
      noUsers,
      showEmoji,
      initialId,
      officeText,
      isMenu,
    } = this.state
    return (
      <div className="chat-page-container">
        {noUsers && (
          <ul className="users-names-list">
            <li className="users-list-heading">USERS</li>
            {usersList.map(eachUservalue => this.renderEachUser(eachUservalue))}
          </ul>
        )}
        <div className="header-card">
          <BsThreeDots className="three-btn" onClick={this.onClickMenu} />
        </div>
        <div className="chat-body">
          <div>
            <div className="chat-body-header">
              <div className="instructions-card">
                <h1 className="body-header-heading">{officeText}</h1>
                <p className="body-header-description">
                  This Channel is For Company Wide Chatter
                </p>
              </div>
              <div>
                <div className="users-icon-number">
                  <p className="users-number"> {user_list.length} | 100</p>
                  <div>
                    <FiUsers className="users-icon" />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {isMenu && (
              <ShowUsers
                usersList={user_list}
                changeOfficeChat={this.onChangeOffice}
                specificOfficeId={initialId}
                officesNames={officesNames}
              />
            )}
            <div className="show-component">
              <ShowUsers
                usersList={user_list}
                changeOfficeChat={this.onChangeOffice}
                specificOfficeId={initialId}
                officesNames={officesNames}
              />
            </div>
          </div>
          <div>
            <div className="user-text-container">
              {userMessages.length === 0 ? (
                <p className="show-send-msg">Send Messages!</p>
              ) : (
                this.renderMessages()
              )}
              <div className="emoji-container">
                <div className="emoji-card-container">
                  {showEmoji && (
                    <EmojiPicker
                      onEmojiClick={this.onClickEmoji}
                      className="emoji-card"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="search-card">
              <input
                type="text"
                placeholder="Type Message"
                className="input-el"
                value={userInput}
                onChange={this.onChangeInput}
              />
              <div className="send-smile-card">
                <button className="show-users-btn" onClick={this.onClickShow}>
                  @
                </button>
                <BsEmojiSmile
                  className="input-smile-emoji"
                  onClick={this.onClickShowEmoji}
                />
                {userInput.length > 0 ? (
                  <BiSend
                    className="input-smile-emoji"
                    onClick={this.onSendBtn}
                  />
                ) : (
                  <span className="body-header-heading">Hi!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatPage
