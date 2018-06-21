import React, { Component } from 'react'

import Modal from './Modal'
import configMonths from './configs/configMonths'

const configWeek = ['sunday', 'mondey', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const YEAR = new Date().getUTCFullYear()

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.currentDate = new Date()
    this.firstDay = new Date(2018, this.currentDate.getMonth(), 1)
    this.configMonths = (localStorage.configMonths && JSON.parse(localStorage.configMonths)) || configMonths

    this.state = {
      year: YEAR,
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
    this.handleClickCloseModal = this.handleClickCloseModal.bind(this)
  }
  componentDidMount () {
    this.setState({
      day: this.currentDate.getDay(),
      date: this.currentDate.getDate(),
      month: this.currentDate.getMonth(),
      currentMonth: this.configMonths[this.currentDate.getMonth()],
      nextMonth: this.configMonths[this.currentDate.getMonth() + 1],
      prevMonth: this.configMonths[this.currentDate.getMonth() - 1],
      startMonth: this.firstDay
    })
    if (!localStorage.configMonths) {
      localStorage.configMonths = JSON.stringify(configMonths)
    }
  }

  render () {
    let { year, currentMonth, startMonth } = this.state
    let rows = this.create42Days()
    // rerender
    return (
      <div>
        <Modal
          open={this.state.showModal}
          close={this.handleClickCloseModal}
          handleChangeEvent={this.handleChangeEvent}
          currentEvent={this.state.currentEvent}
        />
        <div>
          <button onClick={this.handleClickPrev}>prev</button>
          <button onClick={this.handleClickNext}>next</button>
        </div>
        <p>{year}  {currentMonth.title}</p>
        <div id='calendar-head'>
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
        <Grid rows={rows} firstDay={startMonth.getDay()} updateEvent={this.handleClickEvent} />
      </div>
    )
  }
  handleClickPrev () {
    let {year, month} = this.state
    if (month === 0) {
      this.setState({
        month: 11,
        startMonth: new Date(year, 11, 1),
        currentMonth: this.configMonths[11]
      })
    } else {
      this.setState({
        startMonth: new Date(year, month - 1, 1),
        month: month - 1,
        currentMonth: this.configMonths[month - 1]
      })
    }
  }
  handleClickNext () {
    let {year, month} = this.state
    if (month === 11) {
      this.setState({
        month: 0,
        startMonth: new Date(year, 0, 1),
        currentMonth: this.configMonths[0]
      })
    } else {
      this.setState({
        startMonth: new Date(year, month + 1, 1),
        month: month + 1,
        currentMonth: this.configMonths[month + 1]
      })
    }
  }
  handleClickCloseModal () {
    this.setState({
      showModal: !this.state.showModal,
      currentMonth: this.configMonths[this.state.month]
    })
  }
  handleClickEvent (item) {
    this.setState({
      showModal: !this.state.showModal,
      currentEvent: item
    })
    this.currentEvent = item
  }
  handleChangeEvent (event) {
    this.setState({
      currentEvent: Object.assign(
        {},
        this.state.currentEvent,
        {value: event.target.value}
      )
    })
    this.currentEvent.value = event.target.value
    localStorage.configMonths = JSON.stringify(this.configMonths)
  }

  create42Days () {
    let { currentMonth, startMonth } = this.state
    let start = startMonth.getDay()
    let { events } = currentMonth

    let result = []
    let arr = []
    let a
    if (events) {
      for (let i = 0; i < 42; i++) {
        result[i] = null
      }
      for (let i = 0; i < currentMonth.countDays; i++) {
        if (!events[i + 1]) {
          // debugger
          events[i + 1] = { day: i + 1, value: '' }
        }
        (events[i + 1]) && (events[i + 1].day = i + 1)
        result[i + start] = events[i + 1]
      }
      for (let i = 0; i < 6; i++) {
        a = result.splice(0, 7)
        arr.push(a)
      }
      console.log(arr)
    }
    return arr
  }
}

const Grid = (props) => {
  return (
    props.rows.map((item, ind) => {
      return (
        <div className='week' key={ind}>
          <Row week={item} updateEvent={props.updateEvent} />
        </div>
      )
    })
  )
}
const Row = (props) => {
  return (
    props.week.map((item, ind) => {
      if (item) {
        let classnames = item.value.length > 0 ? 'week-day has-event' : 'week-day'
        return (
          <span
            className={classnames}
            key={ind}
            onClick={() => props.updateEvent(item)}>
            {item.day}<br /><br /><br />
            <span className='week-day-event'>{item.value.slice(0, 15)}</span>
          </span>
        )
      } else { return <span className='week-day disabled' key={ind} /> }
    })
  )
}

export default Calendar
