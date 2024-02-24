import React, { Fragment, useState } from 'react'
import Calendar from 'react-calendar'
import './Calendar.css'
import { Listbox, Transition } from '@headlessui/react'
import {
    addMinutes,
    eachHourOfInterval,
    format,
    getMinutes,
    getUnixTime,
    isBefore,
    isToday,
    setHours,
} from 'date-fns'
import { ChevronDown } from '../../assets'
import { MainActionButton, PageBanner } from '../../components/index'
import { bookAppointment } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

const BookingPage = () => {
    const navigate = useNavigate()
    const [chosenDate, setChosenDate] = useState(null)
    const [dateTime, setDateTime] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')
    const [formValue, setFormValue] = useState({
        name: '',
        phone: '',
        email: '',
    })

    const roundedDateTime = (time, interval) => {
        const timeUntilNextInterval = interval - (getMinutes(time) % interval)

        return addMinutes(time, timeUntilNextInterval)
    }

    const getTimes = () => {
        if (!chosenDate) return null

        if (isToday(chosenDate)) {
            const roundedDate = roundedDateTime(chosenDate, 60)
            let beginWorkHour
            if (isBefore(roundedDate, setHours(chosenDate, 8))) {
                beginWorkHour = setHours(chosenDate, 8)
            } else {
                beginWorkHour = roundedDate
            }

            const endWorkHour = setHours(roundedDate, 17)

            if (beginWorkHour > endWorkHour) {
                return null
            }

            const times = eachHourOfInterval({
                start: beginWorkHour,
                end: endWorkHour,
            })
            return times
        } else {
            const beginWorkHour = setHours(chosenDate, 8)

            const endWorkHour = setHours(chosenDate, 17)

            const times = eachHourOfInterval({
                start: beginWorkHour,
                end: endWorkHour,
            })
            return times
        }
    }

    const onClickDay = (date) => {
        setChosenDate(date)
        setDateTime(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!dateTime) {
            setErrorMsg('Please choose an appointment date and time')
            return
        }

        setErrorMsg('')

        const time = getUnixTime(dateTime) * 1000

        bookAppointment({ ...formValue, time: time })

        setFormValue({
            name: '',
            phone: '',
            email: '',
        })

        navigate('/verifyBooking', { replace: true })
    }

    const times = chosenDate && getTimes()

    return (
        <>
            <section className="mt-4 flex min-h-[90svh] flex-col gap-4 md:px-20">
                <PageBanner title="Booking" />
                <div className="flex gap-10">
                    <Calendar
                        className="flex-1 h-max min-w-min"
                        value={chosenDate}
                        onChange={onClickDay}
                        // onClickDay={(date) => onClickDay(date)}
                        view="month"
                        minDate={new Date()}
                    />
                    <div className="flex flex-col flex-1 gap-2">
                        <h5 className="underline uppercase texl-xl">
                            Select a time slot
                        </h5>
                        <div className="flex w-full gap-2 h-fit">
                            <Listbox value={dateTime} onChange={setDateTime}>
                                <div className="relative mt-1 ">
                                    <Listbox.Button className="relative flex items-center justify-between w-full gap-2 px-4 py-2 text-left border rounded-full shadow-md cursor-default border-secondary-theme/70 bg-primary-bg-color focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                        <span className="block truncate">
                                            {dateTime ? (
                                                format(dateTime, 'kk:mm')
                                            ) : (
                                                <span>Time slot</span>
                                            )}
                                        </span>
                                        <span className="flex items-center">
                                            <ChevronDown />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-20 w-full py-1 mt-1 overflow-auto text-base border rounded-md shadow-lg max-h-60 min-w-max border-secondary-theme/70 bg-primary-bg-color ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                            {chosenDate ? (
                                                <>
                                                    {times ? (
                                                        <>
                                                            {times.map(
                                                                (time, i) => (
                                                                    <Listbox.Option
                                                                        key={i}
                                                                        value={
                                                                            time
                                                                        }
                                                                        className={({
                                                                            active,
                                                                        }) =>
                                                                            `relative cursor-default select-none p-2 ${
                                                                                active
                                                                                    ? 'bg-secondary-bg-color '
                                                                                    : 'text-gray-900'
                                                                            }`
                                                                        }
                                                                    >
                                                                        {({
                                                                            selected,
                                                                        }) => (
                                                                            <>
                                                                                <span
                                                                                    className={`flex-center block truncate ${
                                                                                        selected
                                                                                            ? 'font-medium'
                                                                                            : 'font-normal'
                                                                                    }`}
                                                                                >
                                                                                    {format(
                                                                                        time,
                                                                                        'kk:mm'
                                                                                    )}
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                )
                                                            )}
                                                        </>
                                                    ) : (
                                                        <Listbox.Option className="relative p-2 cursor-default select-none ">
                                                            Cannot book any
                                                            appointment for
                                                            today
                                                        </Listbox.Option>
                                                    )}
                                                </>
                                            ) : (
                                                <Listbox.Option className="relative p-2 cursor-default select-none ">
                                                    Please select a date
                                                </Listbox.Option>
                                            )}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h5 className="underline uppercase texl-xl">
                                Enter your contact information
                            </h5>
                            <form onSubmit={handleSubmit} className="gap-1">
                                <label htmlFor="email">Email</label>
                                <input
                                    onChange={handleInputChange}
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formValue.email}
                                    placeholder="Email"
                                    className="block p-3 text-sm text-gray-900 border rounded-full min-w-96 border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                                    required
                                />
                                {/* phone */}
                                <label htmlFor="phone">Phone number</label>
                                <input
                                    onChange={handleInputChange}
                                    type="tel"
                                    size="20"
                                    minLength="9"
                                    maxLength="12"
                                    id="phone"
                                    name="phone"
                                    value={formValue.phone}
                                    placeholder="Phone number"
                                    className="block p-3 text-sm text-gray-900 border rounded-full min-w-96 border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                                    required
                                />
                                {/* Name */}
                                <label htmlFor="name">Your name</label>
                                <input
                                    onChange={handleInputChange}
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formValue.name}
                                    placeholder="Name"
                                    required
                                    className="block p-3 text-sm text-gray-900 border rounded-full min-w-96 border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                                />

                                <MainActionButton
                                    type="submit"
                                    className="mt-4 max-w-96"
                                >
                                    book an appointment
                                </MainActionButton>
                                <div className="font-medium text-red-600">
                                    {errorMsg}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BookingPage
