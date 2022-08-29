import React from 'react'

function formatResult(result: string | number) {
  const resultAsNumber = Number(result)
  const resultAsString = String(resultAsNumber.toFixed(5))
  return resultAsString.replace(/\.?0+$/, '')
}

function useCalculator() {
  const [result, setResult] = React.useState('')
  const [operator, setOperator] = React.useState('')
  const [firstValue, setFirstValue] = React.useState('')
  const [secondValue, setSecondValue] = React.useState('')

  const handleClick = React.useCallback(
    (value: string | number) => {
      if (typeof value === 'number') {
        if (operator) setSecondValue(secondValue + value)
        else setFirstValue(firstValue + value)
      }

      const operations: Record<string, Function> = {
        add: () => setOperator('+'),
        subtract: () => setOperator('-'),
        multiply: () => setOperator('*'),
        divide: () => setOperator('/'),
        clear: () => {
          setResult('')
          setFirstValue('')
          setSecondValue('')
          setOperator('')
        },
        'toggle-sign': () => {
          if (operator && secondValue)
            setSecondValue(String(Number(secondValue) * -1))
          else setFirstValue(String(Number(firstValue) * -1))
        },
        percent: () => {
          if (operator && secondValue)
            setSecondValue(formatResult(Number(secondValue) / 100))
          else setFirstValue(formatResult(Number(firstValue) / 100))
        },
        decimal: () => {
          if (operator) setSecondValue(secondValue + '.')
          else setFirstValue(firstValue + '.')
        },
        equals: () => {
          const newResultByOperator: Record<string, () => number> = {
            '+': () => +firstValue + +secondValue,
            '-': () => +firstValue - +secondValue,
            '*': () => +firstValue * +secondValue,
            '/': () => +firstValue / +secondValue
          }

          const newResult = newResultByOperator[operator]?.()
          if (typeof newResult === 'undefined') return
          setResult('')
          setFirstValue(formatResult(newResult))
          setSecondValue('')
          setOperator('')
        }
      }

      operations[value]?.()
    },
    [firstValue, operator, secondValue]
  )

  const equaltionDisplay = React.useMemo(
    () => `${firstValue} ${operator} ${secondValue}`.trim(),
    [firstValue, operator, secondValue]
  )

  return {
    result,
    equaltionDisplay,
    handleClick
  }
}

export default useCalculator
