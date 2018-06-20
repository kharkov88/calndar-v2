import React, { Component } from 'react'

import Modal from './Modal'
//[[{},{},{},{},{},{},{},{}],[],[],[],[]]
const configWeek = ['sunday','mondey', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const configMonths = [
  {
      title: 'january',
      countDays: 31,
      events: {
        12: {value: 'event 1'}
      }
  },
  {
      title: 'february',
      countDays: 28,
      events: {
        12: {value: 'event 1'}
      }
  },
  {
      title: 'march',
      countDays: 31,
      events: {
        12: {value: 'event 1'}
      }
  },
  {
      title: 'april',
      countDays: 31,
      events: {
        12: {value: 'event 1'}
      }
  },
  {
      title: 'may',
      countDays: 31,
      events: {
        12: {value: 'event 1'}
      }
  },
  {
      title: 'june',
      countDays: 30,
      events: {
        1: {value: 'event 1'},
        2: {value: 'event 2'},
        22: {value: 'event 3'}
      }
  },
  {
      title: 'july',
      countDays: 31,
      events: {
        22: {value: 'event 1'}
      }
  }
]

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.currentDate = new Date()
    this.firstDay = new Date(2018, this.currentDate.getMonth(), 1)

    this.state = {
      day: 1,
      date: 1,
      month: 1,
      currentMonth: 1,
      prevMonth: 0,
      nextMonth: 0,
      startMonth: new Date(),
      showModal: false
    }

    this.create42Days = this.create42Days.bind(this)
    this.handleClickPrev = this.handleClickPrev.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickEvent = this.handleClickEvent.bind(this)
    this.handleChangeEvent = this.handleChangeEvent.bind(this)
  }
  componentDidMount () {
    this.setState({
      day: this.currentDate.getDay(),
      date: this.currentDate.getDate(),
      month: this.currentDate.getMonth(),
      currentMonth: configMonths[this.currentDate.getMonth()],
      nextMonth: configMonths[this.currentDate.getMonth()+1],
      prevMonth: configMonths[this.currentDate.getMonth()-1],
      startMonth: this.firstDay
    })
  }
  render () {
    console.log(this.state)
    let { currentMonth, startMonth } = this.state
    let rows = this.create42Days()
    //rerender
    return (
      <div>
        <Modal
          open={this.state.showModal}
          close={this.handleClickEvent}
          handleChangeEvent={this.handleChangeEvent}
          currentEvent={this.state.currentEvent}
        />
        <p>Calendar</p>
        <div>
          <button onClick={this.handleClickPrev}>prev</button>
          <button onClick={this.handleClickNext}>next</button>
        </div>
        <p>{currentMonth.title}</p>
        <div id='calendar-head'>
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
        <Grid rows={rows} firstDay={startMonth.getDay()} updateEvent={this.handleClickEvent}/>
      </div>
    )
  }
  handleClickPrev() {
    this.setState({
      startMonth: new Date(2018, this.state.month-1, 1),
      month: this.state.month-1,
      currentMonth: configMonths[this.state.month-1]
    })
  }
  handleClickNext() {
    this.setState({
      startMonth: new Date(2018, this.state.month+1, 1),
      month: this.state.month+1,
      currentMonth: configMonths[this.state.month+1]
    })
  }
  handleClickEvent(item) {
    this.setState({
      showModal: !this.state.showModal,
      currentEvent: item
    })
    this.currentEvent = item
  }
  handleChangeEvent(event) {
    this.setState({
      currentEvent: Object.assign(
        {},
        this.state.currentEvent,
        {value: event.target.value}
        )
    })
    this.currentEvent.value = event.target.value
  }

  create42Days() {
    let { currentMonth, startMonth } = this.state
    let start = startMonth.getDay()
    let { events } = currentMonth

    let result = []
    let arr = []
    let a
    if (events) {
      for (let i = 0; i < 42; i++){
        result[i] = null
      }
      for (let i = 0; i < currentMonth.countDays; i++){
        if (!events[i+1]) {
          events[i+1] = { day: i+1, value:'' }
        }
        (events[i+1]) && (events[i+1].day = i+1)
        result[i+start] = events[i+1]
      }
      for (let i =  0; i < 6; i++){
        a = result.splice(0,7)
        arr.push(a)
      }
      console.log(arr)
    }
    return arr
  }
}

const Grid = (props) => {
  return (
    props.rows.map( (item,ind) => {
      return (
        <div className='week' key={ind}>
          <Row week={item} updateEvent={props.updateEvent}/>
        </div>
      )
    })
    )
}
const Row = (props) => {
  return (
    props.week.map( (item,ind) => {
      if(item) {
        let classnames = item.value.length > 0 ? 'week-day has-event' : 'week-day'
        return (
          <span
            className={classnames}
            key={ind}
            onClick={() => props.updateEvent(item)}>
            {item.day}<br/>{item.value}
          </span>
          )
      }
      else
        return <span className='week-day disabled' key={ind}></span>
    })
    )
}

export default Calendar
