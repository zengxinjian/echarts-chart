//    var fft={version: "1.0.0"}
	jsFFT = {};
  
  
	// create real array and populate using realfunc
   jsFFT.populateFullReal = function(fftlen,realfunc) {
		// create buffer		
		var buffer = new ArrayBuffer(fftlen*4);
		var data = new Float32Array(buffer);
	
		// fill real buffer
		for(var i=0;i<fftlen;++i) {
			data[i] = realfunc(i,fftlen);
		}
		return data;
	};

	jsFFT.makeComplex = function(realdata,fftlen) {
		// create complex array
		var buffer = new ArrayBuffer(2*fftlen*4);
		var cplxdata = new Float32Array(buffer);
		// copy real data points to complex array
		for(var i=0;i<fftlen;++i) {
			cplxdata[i<<1]     = realdata[i];
			cplxdata[(i<<1)+1] = 0;
		}
		return cplxdata;
	};

	// populate N real signal into N/2 complex
	// this a no-op, since we simply consider even = real, odd = cplx
	jsFFT.packRealToHalfComplex = function(realdata,fftlen) {
		// create buffer		
		var buffer = new ArrayBuffer(fftlen*4);
		var data = new Float32Array(buffer);
	
		// verify that realdata is appropriate length
		if(realdata.length!=fftlen) {
			console.log("populateHalfComplex: Passed realdata is wrong length");
		}
	
		// copy real data to complex array
		for(var i=0;i<fftlen;++i) {
			data[i] = realdata[i];
		}
		return data;
	}

	// simply duplicates a complex array
	jsFFT.copyComplexArray = function(orig,fftlen) {
		// create complex array
		var buffer = new ArrayBuffer(2*fftlen*4);
		var data = new Float32Array(buffer);
		// copy real data points to complex array
		for(var i=0;i<fftlen;++i) {
			data[i<<1]     = orig[i<<1];
			data[(i<<1)+1] = orig[(i<<1)+1];
		}
		return data;
	}

	// Complex FFT
	// using decimation in time
	jsFFT.FFT = function(origdata, nn, sign)			// forward=1 inverse=-1
	{
		
		// copy the data
		var data = jsFFT.copyComplexArray(origdata,nn);
	    
		// unsigned longs
		var n, mmax, m, j, istep, i;
	
		// doubles
		var wtemp, wr, wpr, wpi, wi, theta;
		var tempr, tempi, temp;

		// bit - reverse
		n = nn<<1;
		j=1;
		for (i=1; i<n; i+=2) {
			if (j>i) {
				temp = data[i-1]; data[i-1] = data[j-1]; data[j-1] = temp;
				temp = data[i];   data[i]   = data[j];   data[j]   = temp;
			}
			m = nn;
			while (m>=2 && j>m) {
				j -= m;
				m >>= 1;
			}
			j += m;
		};

		// here begins the Danielson-Lanczos section
		mmax=2;
		while (n>mmax) {
			istep = mmax<<1;
			theta = (2*Math.PI/mmax)*sign;
			wtemp = Math.sin(0.5*theta);
			wpr = -2.0*wtemp*wtemp;
			wpi = Math.sin(theta);
			wr = 1.0;
			wi = 0.0;
			for (m=1; m < mmax; m += 2) {
				for (i=m; i <= n; i += istep) {
					j=i+mmax;
					tempr = wr*data[j-1] - wi*data[j];
					tempi = wr * data[j] + wi*data[j-1];

					data[j-1] = data[i-1] - tempr;
					data[j] = data[i] - tempi;
					data[i-1] += tempr;
					data[i] += tempi;
				}
				wtemp=wr;
				wr += wr*wpr - wi*wpi;
				wi += wi*wpr + wtemp*wpi;
			}
			mmax=istep;
		}
	
		// scale complex values by 1/nn if inverse fft
		if(sign==-1) {
			for(i=0;i<n;++i) {
				data[i] = data[i]/nn;
			}
		}
		return data;
	};

	// compute magnitude of complex array
	jsFFT.Magnitude = function(orig, fftlen)
	{
		"use strict";
		// create magnitude array
		var buffer = new ArrayBuffer(1*fftlen/2*4);
		var mag = new Float32Array(buffer);
	
		// Iterate over first fftlen / 2 complex values
		for(var i=0;i<fftlen/2;++i) {
			mag[i] = Math.sqrt(orig[i<<1]*orig[i<<1]+orig[(i<<1)+1]*orig[(i<<1)+1]);
		}
		return mag;
	}

	// unpack complex 1/2 length fft
	jsFFT.RealFFT = function(orig, nn, sign)
	{
		"use strict";
		var data = jsFFT.copyComplexArray(orig,nn);		// create a copy of data
		var n2 = nn/2;
		var i,i1,i2,i3,i4,np3;
		var c1=0.5,c2,h1r,h1i,h2r,h2i;
		var wr,wi,wpr,wpi,wtemp,theta;

		theta=Math.PI/(nn>>1);
		if (sign == 1) {
			c2 = -0.5;
			data = jsFFT.FFT(data,n2,1);
		} else {
			c2=0.5;
			theta = -theta;
		}
	
		// Unpack from nn>>1 complex
		wtemp=Math.sin(0.5*theta);
		wpr = -2.0*wtemp*wtemp;
		wpi=Math.sin(theta);
		wr=1.0+wpr;
		wi=wpi;
		np3=nn+3;
		for (i=2;i<=(nn>>2);i++) {
			i4=1+(i3=np3-(i2=1+(i1=i+i-1)));
//			console.log("Unpacking at i=%d i1 - i4: %d %d %d %d\n",i-1,i1-1,i2-1,i3-1,i4-1);
			h1r=c1*(data[i1-1]+data[i3-1]);
			h1i=c1*(data[i2-1]-data[i4-1]);
			h2r = -c2*(data[i2-1]+data[i4-1]);
			h2i=c2*(data[i1-1]-data[i3-1]);
			data[i1-1]=h1r+wr*h2r-wi*h2i;
			data[i2-1]=h1i+wr*h2i+wi*h2r;
			data[i3-1]=h1r-wr*h2r+wi*h2i;
			data[i4-1]=-h1i+wr*h2i+wi*h2r;
			wr=(wtemp=wr)*wpr-wi*wpi+wr;
			wi=wi*wpr+wtemp*wpi+wi;
		}
		if (sign == 1) {
			h1r = data[0];
			data[0] = data[0]+data[1];
			data[1] = h1r-data[1];
		} else {
			h1r = data[0];
			data[0]=c1*(data[0]+data[1]);
			data[1]=c1*(h1r-data[1]);
			data = jsFFT.FFT(data,n2,-1);
		}
		return data;
	}

	// pack a full real signal into a half length
	// complex.
	jsFFT.unpackToHalfComplexToReal = function(data, nn) {
		// pack even to real nn/2
		// pack odd to imaginary nn/2
		for(var i=0;i<nn<<1;i+=2) {
			data[(nn<<1)-i] = data[(nn-i)<<1];
			data[(nn<<1)-i+1] = data[nn-i];
			data[(i>>1)+1] = data[i+1];
		}
	}

	// unpack a complex half FFT to a full FFT
	// so it can be processed etc.
	jsFFT.unpackHalfComplexFFT = function(orig, fftlen) {
		// create complex array
		var buffer = new ArrayBuffer(2*fftlen*4);
		var data = new Float32Array(buffer);

		// copy real and imaginary data
		for(var i=0;i<fftlen/2;++i) {
			// copy original half
			data[(i<<1)]   = orig[(i<<1)];
			data[(i<<1)+1] = orig[(i<<1)+1];
			// duplicate and mirroe comple
			data[(fftlen<<1)-(i<<1)]   = orig[(i<<1)];
			data[(fftlen<<1)-(i<<1)+1] = -orig[(i<<1)+1];
		}
		data[fftlen] = orig[1];
		data[1] = 0.0;
		return data;
	}
	


