import Image from 'next/image'

export function HighLightBlock({ imgUrl, title, subTitle, description }) {
  return (
    <div className="aspect-[624/160] relative w-full home-hight-light-group">
      <Image
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        src={'/images/frame-01.png'}
        alt={title}
        width={624}
        height={160}
      />
      <div className="w-full h-full flex justify-start items-center gap-8 px-[10%] py-[4%]">
        <Image
          className="aspect-square w-[16%]"
          src={imgUrl}
          alt={'icon'}
          width={104}
          height={104}
        />
        <div>
          <h5 className="text-282942 font-bold text-[length:var(--title-size)]">{title}</h5>
          <h6 className="text-808080 text-opacity-80 font-bold text-[length:var(--sub-title-size)]">
            {subTitle}
          </h6>
          <p className="text-343A40 font-bold text-[length:var(--description-size)]">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
