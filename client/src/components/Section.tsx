import Card from "./Card"

interface propsType {
    sectionName: String,
    sectionBackgroundColor: string
}

const Section = ({sectionName, sectionBackgroundColor}: propsType) => {
  return (
    <div className={`w-full px-30 py-12 ${sectionBackgroundColor}`}>
        <div className="mb-8 font-bold text-2xl">{sectionName}</div>
        <div className="flex flex-wrap -mx-4">
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                <Card/>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                <Card/>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                <Card/>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                <Card/>
            </div>
            
        </div>
    </div>
  )
}

export default Section