import React from 'react'
import Card from '../ui/Card'
import classes from './SessionData.module.css'

const SessionData = (props) => {

    return (
        <Card>
        <div className={classes.content}>
          <h3>{props.session.name}</h3>
          <time>{props.session.date.split(" ")[0]}</time>
          <p>{props.session.description}</p>
          <p>Session moderator: {props.session.user.name} {props.session.user.lastName}</p>
        </div>
      </Card>
    )
}

export default SessionData