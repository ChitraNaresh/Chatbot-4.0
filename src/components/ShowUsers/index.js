import './index.css'
import {AiOutlinePlusCircle} from 'react-icons/ai'
const ShowUsers = props => {
  const {changeOfficeChat, specificOfficeId, officesNames} = props

  const renderEachOffice = (eachOffice, specificOfficeId) => {
    const onClickMenuLink = event =>
      changeOfficeChat(eachOffice.id, eachOffice.officeName)
    const bgColor = specificOfficeId === eachOffice.id ? 'officeNameBg' : null
    console.log(bgColor)
    return (
      <li
        className={`office-card ${bgColor}`}
        onClick={onClickMenuLink}
        id={eachOffice.id}
        key={eachOffice.id}
      >
        <div className="hash-card">#</div>
        <h1 className="company-menu-name">{eachOffice.officeName}</h1>
      </li>
    )
  }
  return (
    <div className="list-users">
      <div className="main-user">
        <div className="user-dot-card">
          <div className="menu-user-icon">RR</div>
          <div className="dot"></div>
        </div>
        <div className="user-menu-name-container">
          <h1 className="menu-user-name">Rolande Raimondi</h1>
          <h1 className="user-profession">Reasearch Nurse</h1>
        </div>
      </div>
      <div className="conversations-card">
        <h1 className="conversation-text">Conversations</h1>
        <AiOutlinePlusCircle />
      </div>
      <ul className="offices-card">
        {officesNames.map(eachOffice =>
          renderEachOffice(eachOffice, specificOfficeId),
        )}
      </ul>
    </div>
  )
}

export default ShowUsers
