"use client"

const OutfitCard = ({ item = {} }) => {
    // destructuring
    const {
        image_path,
        item_name,
        item_id
    } = item || {};
    // main render
    return (
        <div className="w-full bg-[#FAFAFB] flex flex-col justify-start rounded-lg gap-4 p-4">
            <div className="w-full h-[220px] overflow-hidden">
                <img
                    src={image_path}
                    className="w-full h-full object-contain rounded-lg"
                    alt={item_name || "N/A"}
                />
            </div>
            <p className="xs:text-xl text-lg text-primary-dark font-primary">
                {item_name || "N/A"}
            </p>
        </div>
    )
}

export default OutfitCard