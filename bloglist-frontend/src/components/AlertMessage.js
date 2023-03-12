const AlertMessage = ({ text, style }) => {
  var noteStyle = {
    color: 'green',
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (style === 'error') {
    noteStyle = {
      color: 'red',
      fontSize: 20,
      background: 'yellow',
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  }
  if (text === null) {
    return
  }
  return (
    <div style={noteStyle}>
      {text}
    </div>
  )
}

export default AlertMessage