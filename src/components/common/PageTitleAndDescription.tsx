interface Props{
    title?:string, 
    description:string[], 
    extraClasses?:string
}

const PageTitleAndDescription = ({title, description, extraClasses} : Props) =>{
    return(
        <div className={extraClasses||""}>
            {title !== undefined && 
                <div className="item-padding border-b-[.5px] border-gray-500 font-bold">
                    {title}
                </div>
            }
            <div className="item-padding">
                {description.map((desc, index) => <p key={`description_${index}`}>{desc}</p>)}
            </div>
        </div>
    )
}
  
export default PageTitleAndDescription;