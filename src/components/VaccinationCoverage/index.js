import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {reqData} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="cov-card">
      <h1 className="cov-head">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={reqData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccine_date"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose_1" name="dose_1" fill=" #5a8dee" barSize="10%" />
        <Bar dataKey="dose_2" name="dose_2" fill="#f54394" barSize="10%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
