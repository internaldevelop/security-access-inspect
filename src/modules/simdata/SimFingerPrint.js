

class SimFingerPrint {
    allFP() {
        if (global.simuData) {
            return _fpList;
        } else {
            return [];
        }
    }

    getFP(assetUuid) {
        if (global.simuData) {
            return _fpList[0];
        } else {
            return {};
        }
    }
}

const _fpList = [
    {
        os: "Windows 10",
        sys_name: "baixd",
        sys_type: "Windows 10",
        sys_version: "10.0", 
        ComputerSystem: {
            serialnumber: "X550VX",
            baseboard: {
                manufacturer: "ASUSTeK COMPUTER INC.",
                model: "",
                serialNumber: "BSN12345678901234567",
                version: "1.0       "
            },
            model: "X550VX",
            firmware: {
                description: "BIOS Date: 04/22/16 14:05:07 Ver: 05.0000B",
                manufacturer: "American Megatrends Inc.",
                name: "BIOS Date: 04/22/16 14:05:07 Ver: 05.0000B",
                releaseDate: "2016-04-22",
                version: "_ASUS_ - 1072009"
            },
            manufacturer: "ASUSTeK COMPUTER INC."
        },
        Network: [{
            netWorkName: "eth5(Realtek PCIe GBE Family Controller)",
            macAddress: "70:8b:cd:25:bf:ad",
            packetsRecv: "149436",
            bytesRecv: "51.5 MiB",
            packetsSent: 308913,
            bytesSent: "220.5 MiB",
            speed: "100 Mbps",
            mtu: 1500
        }, {
            netWorkName: "wlan1(Microsoft Wi-Fi Direct Virtual Adapter #2)",
            macAddress: "54:8c:a0:35:15:52",
            speed: "0 bps",
            mtu: 1500
        }, {
            netWorkName: "wlan2(Realtek RTL8723BE Wireless LAN 802.11n PCI-E NIC)",
            macAddress: "54:8c:a0:35:15:52",
            speed: "72.2 Mbps",
            mtu: 1400
        }, {
            netWorkName: "wlan3(Microsoft Wi-Fi Direct Virtual Adapter)",
            macAddress: "56:8c:a0:35:15:52",
            speed: "0 bps",
            mtu: 1500
        }],
        CPU: {
            cpu64bit: false,
            identifier: "Intel64 Family 6 Model 94 Stepping 3",
            physicalPackageCount: 1,
            stepping: 3,
            processorID: "BFEBFBFF000506E3",
            systemLoadAverage: -1.0,
            systemSerialNumber: "G8N0CV00K191318     ",
            vendor: "GenuineIntel",
            name: "Intel(R) Core(TM) i7-6700HQ CPU @ 2.60GHz",
            logicalProcessorCount: 8,
            model: 94,
            family: 6,
            vendorFreq: 2600000000,
            physicalProcessorCount: 4
        },
    },
];

export default new SimFingerPrint();
// {
// 	SoundCards=[{
// 		name=Intel(R) Corporation 英特尔(R) 显示器音频, 
// 		codec=英特尔(R) 显示器音频, 
// 		driverVersion=Intel(R) Corporation 英特尔(R) 显示器音频 IntcDAud.sys 10.22.0.96
// 	}, {
// 		name=Realtek Semiconductor Corp. Realtek High Definition Audio, 
// 		codec=Realtek High Definition Audio, 
// 		driverVersion=Realtek Semiconductor Corp. Realtek High Definition Audio RTKVHD64.sys 6.0.1.8564
// 	}], 
// 	sys_version=10.0, 
// 	ComputerSystem={
// 		serialnumber=X550VX, 
// 		baseboard={
// 			manufacturer=ASUSTeK COMPUTER INC.,
// 			model=, 
// 			version=1.0       , 
// 			serialNumber=BSN12345678901234567
// 		}, 
// 		model=X550VX, 
// 			firmware={
// 			manufacturer=American Megatrends Inc., 
// 			name=BIOS Date: 04/22/16 14:05:07 Ver: 05.0000B, 
// 			description=BIOS Date: 04/22/16 14:05:07 Ver: 05.0000B, 
// 			version=_ASUS_ - 1072009, 
// 			releaseDate=2016-04-22
// 		}, 
// 		manufacturer=ASUSTeK COMPUTER INC.
// 	}, 
// 	Network=[{
// 		netWorkName=eth5(Realtek PCIe GBE Family Controller), 
// 		macAddress=70:8b:cd:25:bf:ad, 
// 		packetsRecv=149436, 
// 		bytesRecv=51.5 MiB, 
// 		packetsSent=308913, 
// 		bytesSent=220.5 MiB, 
// 		speed=100 Mbps, 
// 		mtu=1500
// 	}, {
// 		netWorkName=wlan1(Microsoft Wi-Fi Direct Virtual Adapter #2), 
// 		macAddress=54:8c:a0:35:15:52, 
// 		packetsRecv=0, 
// 		bytesRecv=0 bytes, 
// 		packetsSent=0, 
// 		bytesSent=0 bytes, 
// 		speed=0 bps, 
// 		mtu=1500
// 	}, {
// 		netWorkName=wlan2(Realtek RTL8723BE Wireless LAN 802.11n PCI-E NIC), 
// 		macAddress=54:8c:a0:35:15:52, 
// 		packetsRecv=35794, 
// 		bytesRecv=26.2 MiB, 
// 		packetsSent=28896, 
// 		bytesSent=5.2 MiB, 
// 		speed=72.2 Mbps, 
// 		mtu=1400
// 	}, {
// 		netWorkName=wlan3(Microsoft Wi-Fi Direct Virtual Adapter), 
// 		macAddress=56:8c:a0:35:15:52, 
// 		packetsRecv=0, 
// 		bytesRecv=0 bytes, 
// 		packetsSent=0, 
// 		bytesSent=0 bytes, 
// 		speed=0 bps, 
// 		mtu=1500
// 	}], 
// 	CPU={
// 		cpu64bit=false, 
// 		identifier=Intel64 Family 6 Model 94 Stepping 3, 
// 		physicalPackageCount=1, 
// 		stepping=3, 
// 		processorID=BFEBFBFF000506E3, 
// 		systemLoadAverage=-1.0, 
// 		systemSerialNumber=G8N0CV00K191318     , 
// 		vendor=GenuineIntel, 
// 		name=Intel(R) Core(TM) i7-6700HQ CPU @ 2.60GHz, 
// 		logicalProcessorCount=8, 
// 		model=94, 
// 		family=6, 
// 		vendorFreq=2600000000, 
// 		physicalProcessorCount=4
// 	}, 
// 	sys_name=baixd, 
// 	sys_type=Windows 10
// }

