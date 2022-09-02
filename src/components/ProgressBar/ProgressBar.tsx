interface Props {
  progress: number
}

const ProgressBar = (props: Props) => {
  return (
    <div className="h-4 bg-gray-200 rounded-lg w-full">
      <div className="h-full bg-primary rounded-lg" style={{
        width: `${props.progress}%`
      }}>
      </div>
    </div>
  )
}

export default ProgressBar
