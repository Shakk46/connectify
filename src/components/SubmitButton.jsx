export const SubmitButton = ({onClick}) => {
    const styles = {
        width: '100px',
        height: '40px',
        backgroundColor: 'lightblue',
        borderRadius: '8px',
        color: 'white'
    }
    return (
        <button style={styles} onClick={onClick}>Submit</button>
    )
}