import React from 'react'
import DotPattern from "../src/component/dotPattern";
function third() {

    return (
        <>
        <DotPattern
            glowColor="#ff0000"
            baseColor="#555555"
            gap={30}
            proximity={150}
            glowIntensity={1.5}
        />
        
        <div className='thirdsec'>
            <div className='divthird'>
                <iframe className='animate__animated animate__rubberBand animate__delay-8s' src="https://youtube.com/embed/AxMKVL3j990?si=W8qx5SrOGR0Jq_Tk" title="YouTube video player"  allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" width="100%" height="100%" style={{borderRadius:"25px"}}></iframe>
            </div>
            < div className='divthir'>
                <div className='divthir1'>
                    <iframe className='animate__animated animate__rubberBand animate__delay-8s' src="https://youtube.com/embed/81qs3b44KoM?si=K0ZjbfQmKzRMMOYP" title="YouTube video player"  allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" width="100%" height="100%" style={{borderRadius:"25px"}}></iframe>
                </div>
                <div className='divthir1'>
                    <iframe className=' animate__animated animate__rubberBand animate__delay-8s' src="https://youtube.com/embed/0oQDFZ1UOOA?si=0GcZEWbbGRBGCwrl" title="YouTube video player"  allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" width="100%" height="100%" style={{borderRadius:"25px"}}></iframe>
                </div>
                <div className='divthir1'>
                    <iframe className='animate__animated animate__rubberBand animate__delay-8s' src="https://youtube.com/embed/D2NnL3iSJhI?si=SCFyl0zOdH5xU0Pg" title="YouTube video player"  allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" width="100%" height="100%" style={{borderRadius:"25px"}}></iframe>
                </div>
            </div>
        </div>
        </>
    );
    }

export default third
