import Image from 'next/image';
import awsSC from '../../../../public/assets/certificates/aws-certified-solutions-architect-associate.png';

const Certificates = () => {
  return (
    <div className=" w-screen h-screen flex flex-col justify-center">
      <h2 className="project-glitch my-0 mx-auto text-5xl lg:text-6xl hello neon">
        CERTIFICATES
      </h2>
      <div className='h-[70%] flex flex-wrap items-center justify-center'>
        <figure className="relative w-[200px] h-[200px]">
          <Image src={awsSC} fill quality={100} alt={''} priority/>
        </figure>
      </div>
    </div>
  );
};

export default Certificates;
