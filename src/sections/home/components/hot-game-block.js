import Image from 'next/image'

export function HotGameBlock({ bgImgUrl, iconUrl, value, unit, title, subTitle }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div
        className="aspect-square w-[224px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${bgImgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="aspect-square w-[73px] -mb-5">
          <Image src={iconUrl} alt="icon" width={73} height={73} />
        </div>
        <p className="flex justify-center items-end text-fff -mr-6">
          <span className="font-bold text-[56px]">{value}</span>
          <span className="font-bold text-2xl inline-block pb-3 pl-1">{unit}</span>
        </p>
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <h5 className="text-center text-282942 font-bold text-xl">{title}</h5>
        <p className="text-center text-808080">{subTitle}</p>
      </div>
    </div>
  )
}
