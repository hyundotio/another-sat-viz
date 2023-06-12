const data = ["POLAR","1 23802U 96013A   23108.00229763  .00000181  00000+0  00000+0 0  9995","2 23802  78.8726 238.6717 5764657 248.4098  42.7604  1.29847035129840","SWAS","1 25560U 98071A   23109.46696283  .00004274  00000+0  38280-3 0  9992","2 25560  69.8983 294.3900 0009976 231.0321 128.9948 14.96528857323771","CXO","1 25867U 99040B   23109.78535750  .00000756  00000+0  00000+0 0  9991","2 25867  38.2311 204.3839 9040923 256.2348   0.1021  0.37809690 12968","XMM-NEWTON","1 25989U 99066A   23110.63713538 -.00000097  00000+0  00000+0 0  9991","2 25989  69.2601 299.3483 5625031  83.1353 359.7135  0.50126634 31589","CLUSTER II-FM7 (SAMBA)","1 26410U 00041A   23111.44307514  .00000192  00000+0  00000+0 0  9994","2 26410 135.7797 351.2012 6387773 204.8685   0.8460  0.44229033 15171","CLUSTER II-FM6 (SALSA)","1 26411U 00041B   23109.17353573  .00000104  00000+0  00000+0 0  9991","2 26411 140.0753 358.3128 8076897 212.0134   0.8726  0.44210350 15237","CLUSTER II-FM5 (RUMBA)","1 26463U 00045A   23111.45031717  .00000368  00000+0  00000+0 0  9991","2 26463 143.3255 358.4394 7578137 212.8768   1.0380  0.44209597 15103","CLUSTER II-FM8 (TANGO)","1 26464U 00045B   23111.44289037  .00000193  00000+0  00000+0 0  9997","2 26464 135.7873 351.1942 6385560 204.8670   0.8593  0.44219138 15185","ODIN","1 26702U 01007A   23109.01999592  .00016370  00000+0  91664-3 0  9999","2 26702  97.5076 123.5359 0008545 324.0027  36.0627 15.13473240212426","TIMED","1 26998U 01055B   23109.21583539  .00003250  00000+0  34431-3 0  9993","2 26998  74.0753  30.1859 0002233 223.2702 136.8304 14.89568234158511","RHESSI","1 27370U 02004A   23109.72733825  .09284791  49088-5  80738-3 0  9990","2 27370  38.0148 211.4523 0002536 349.2955 139.6276 16.38230748174408","INTEGRAL","1 27540U 02048A   23108.23064358  .00000315  00000+0  00000+0 0  9994","2 27540  82.7775  41.8893 8799292 293.0025 350.7358  0.37577826 22286","CORIOLIS","1 27640U 03001A   23109.77973070  .00000276  00000+0  15224-3 0  9999","2 27640  98.7170 118.8221 0013108 298.8361  61.1498 14.19244686 50397","SORCE","1 27651U 03004A   23109.80500781  .00004894  00000+0  49098-3 0  9999","2 27651  39.9944 305.3446 0019197 109.5315 250.7550 14.91627526 98810","MOST","1 27843U 03031D   23109.00496271  .00000244  00000+0  13317-3 0  9992","2 27843  98.7090 117.1311 0009778 353.5423   6.5626 14.20781836 26643","SCISAT 1","1 27858U 03036A   23109.50650695  .00001463  00000+0  20703-3 0  9991","2 27858  73.9315 299.6299 0008903 266.4686  93.5471 14.78109859 60641","SWIFT","1 28485U 04047A   23108.93922158  .00011465  00000+0  65516-3 0  9997","2 28485  20.5576 321.5301 0009325 219.8421 140.1330 15.10065778  9646","CLOUDSAT","1 29107U 06016A   23109.53794475  .00000957  00000+0  19240-3 0  9990","2 29107  98.3706  78.3762 0004502  74.1331 286.0366 14.63919614903790","CALIPSO","1 29108U 06016B   23109.53751344  .00002839  00000+0  55200-3 0  9996","2 29108  98.3700  77.8609 0001469  86.6621 273.4749 14.63927382903783","HINODE (SOLAR-B)","1 29479U 06041A   23109.28622233  .00001838  00000+0  34860-3 0  9998","2 29479  98.1096 125.4485 0017841 346.8536  13.2200 14.65348015885535","SJ-6C","1 29505U 06046A   23109.54275480  .00005681  00000+0  48189-3 0  9999","2 29505  97.7556 133.5548 0004186 159.9683 359.4409 14.98324632898484","SJ-6D","1 29506U 06046B   23109.55011525  .00004020  00000+0  37308-3 0  9996","2 29506  97.7754 133.2804 0000316 247.2905 112.8296 14.94978598897853","AGILE","1 31135U 07013A   23108.35799542  .00040633  00000+0  67279-3 0  9991","2 31135   2.4684 332.7508 0007968 253.3005 106.6175 15.49748518524105","AIM","1 31304U 07015A   23109.34883666  .00027004  00000+0  10039-2 0  9990","2 31304  97.8690  46.7588 0005150  57.4171 302.7564 15.27493697877693","FGRST (GLAST)","1 33053U 08029A   23109.50636827  .00005049  00000+0  25580-3 0  9995","2 33053  25.5825 238.3922 0012061 128.5255 231.6364 15.13742653820091","WISE","1 36119U 09071A   23109.05308755  .00022937  00000+0  57220-3 0  9996","2 36119  97.2023 142.7831 0000092  41.6968 318.4286 15.40199288742413","SDO","1 36395U 10005A   23109.48840255 -.00000046  00000+0  00000+0 0  9992","2 36395  32.2602 104.2887 0002151 235.7766 301.2920  1.00273143 48480","CRYOSAT 2","1 36508U 10013A   23109.60268267  .00000434  00000+0  10709-3 0  9999","2 36508  92.0272 358.2538 0001887 313.1116  46.9933 14.51907087690551","X-SAT","1 37389U 11015C   23109.97547003  .00000200  00000+0  10345-3 0  9995","2 37389  98.3071 132.1946 0015141 129.5526 230.7004 14.24511568623844","GCOM-W1 (SHIZUKU)","1 38337U 12025A   23109.30421785  .00001569  00000+0  35788-3 0  9993","2 38337  98.2070  50.4915 0002062  61.8636  91.0977 14.57151985580851","NUSTAR","1 38358U 12031A   23108.24382167  .00007362  00000+0  64437-3 0  9995","2 38358   6.0272 303.4239 0010102  62.1768 297.9384 14.91489623590399","NEOSSAT","1 39089U 13009D   23109.40654057  .00000464  00000+0  17835-3 0  9998","2 39089  98.4125 302.9090 0012454  87.8650 272.3961 14.34841882531083","BRITE-AUSTRIA","1 39091U 13009F   23109.31134057  .00000499  00000+0  18845-3 0  9994","2 39091  98.3944 303.4993 0011631  87.4684 272.7834 14.35453683531308","IRIS","1 39197U 13033A   23109.39815946  .00002506  00000+0  33460-3 0  9990","2 39197  97.9706 297.7220 0028280 117.8129 242.5955 14.80181845529218","HISAKI (SPRINT-A)","1 39253U 13049A   23109.59356144  .00000142  00000+0  10696-3 0  9992","2 39253  29.7211 328.9738 0136753  17.8778 342.6545 13.55319575474669","CASSIOPE","1 39265U 13055A   23109.57960570  .00029799  00000+0  72905-3 0  9994","2 39265  80.9571 300.5067 0579507 124.8001 240.9148 14.49621812496484","STSAT-3","1 39422U 13066G   23109.37566848  .00003376  00000+0  33722-3 0  9996","2 39422  97.4845 103.4660 0021769 345.5995  14.4601 14.91950735511427","SWARM B","1 39451U 13067A   23109.55109460  .00005432  00000+0  23275-3 0  9999","2 39451  87.7491 329.7009 0002526  94.4738 265.6797 15.22564893507469","SWARM A","1 39452U 13067B   23109.56184262  .00010383  00000+0  29234-3 0  9996","2 39452  87.3512 114.9708 0002785  90.6820 269.4752 15.36318201528851","SWARM C","1 39453U 13067C   23109.56173250  .00010387  00000+0  29246-3 0  9999","2 39453  87.3361 113.8171 0002806  90.3980 269.7595 15.36315374528816","BRITE-CA1 (TORONTO)","1 40020U 14033L   23109.39843642  .00001868  00000+0  31777-3 0  9991","2 40020  97.8172 258.6181 0085692   8.7017 351.5650 14.67840819472529","OCO 2","1 40059U 14035A   23109.54569528  .00001281  00000+0  29419-3 0  9999","2 40059  98.1969  51.4947 0000712  83.2015 276.9264 14.57142644467901","BRITE-PL2 (HEWELIUSZ)","1 40119U 14049B   23109.27532512  .00003870  00000+0  44460-3 0  9993","2 40119  97.8776 206.9049 0015777 324.4066  35.6096 14.86324549469412","RESURS P2","1 40360U 14087A   23109.78689821  .00016958  00000+0  39452-3 0  9991","2 40360  97.1814 194.1036 0009315  68.9773  46.4286 15.42329495465365","MMS 1","1 40482U 15011A   23108.65339456 -.00000651  00000+0  00000+0 0  9992","2 40482  28.9203  72.0402 9071974  88.2498  74.2480  0.28601600 14176","MMS 2","1 40483U 15011B   23108.66172789 -.00000651  00000+0  00000+0 0  9998","2 40483  28.9129  72.0444 9073123  88.2466  75.1295  0.28603037 14230","MMS 3","1 40484U 15011C   23108.67283900 -.00000652  00000+0  00000+0 0  9999","2 40484  28.9129  72.0447 9072776  88.2451  76.2623  0.28600831 13911","MMS 4","1 40485U 15011D   23108.67978345 -.00000652  00000+0  00000+0 0  9994","2 40485  28.9154  72.0329 9073632  88.2620  76.9764  0.28605789 14123","ASTROSAT","1 40930U 15052A   23109.17499365  .00003157  00000+0  34480-3 0  9995","2 40930   5.9959 157.0726 0008326 170.0156 190.0138 14.77418784408423","DAMPE","1 41173U 15078A   23109.48482500  .00002463  00000+0  10037-3 0  9991","2 41173  97.4029 101.1989 0012674 194.7012 264.4294 15.25358402408213","PISAT","1 41784U 16059B   23109.03180566  .00001892  00000+0  36301-3 0  9994","2 41784  97.8761 144.9083 0029902 283.0067  76.7798 14.64555601350404","FLYING LAPTOP","1 42831U 17042G   23109.57956345  .00003209  00000+0  31399-3 0  9992","2 42831  97.3958 310.8537 0014935  66.9018 293.3792 14.92887572313746","PICSAT","1 43132U 18004X   23109.26137643  .00074199  00000+0  13089-2 0  9995","2 43132  97.3344 191.1105 0003892 327.5943  32.5069 15.50131096293390","ZHANGZHENG-1 (CSES)","1 43194U 18015C   23109.46545751  .00020214  00000+0  90565-3 0  9994","2 43194  97.5549 245.4552 0004113 129.2245 316.2195 15.21271980289139","ICON","1 44628U 19068A   23109.31263597  .00006070  00000+0  52235-3 0  9991","2 44628  26.9876 107.1868 0017990  80.3699 279.8891 14.94978243192340","SALSAT","1 46495U 20068K   23109.37634657  .00007388  00000+0  49434-3 0  9992","2 46495  97.7662  56.8001 0014460 326.7807  33.2511 15.07157593140211","IXPE","1 49954U 21121A   23108.10117615  .00007853  00000+0  65278-3 0  9997","2 49954   0.2307 303.0468 0010656  96.4872 320.5440 14.93498758 74000","STARLETTE","1 07646U 75010A   23109.13153644 -.00000124  00000+0  13152-4 0  9991","2 07646  49.8259 343.7037 0205743 207.3454 151.6487 13.82317703434766","LAGEOS 1","1 08820U 76039A   23109.52044193  .00000018  00000+0  00000+0 0  9993","2 08820 109.8162 143.8566 0045034 190.1329 152.5773  6.38664700839393","COSMOS 1989 (ETALON 1)","1 19751U 89001C   23109.43060416  .00000058  00000+0  00000+0 0  9991","2 19751  64.3909 111.8551 0024013 214.6119 315.8894  2.13156230266759","COSMOS 2024 (ETALON 2)","1 20026U 89039C   23108.65781617 -.00000065  00000+0  00000+0 0  9994","2 20026  65.4847 350.0335 0018683 218.4096  39.9053  2.13204276263862","LAGEOS 2","1 22195U 92070B   23109.02003683 -.00000009  00000+0  00000+0 0  9992","2 22195  52.6511 276.7018 0138763  42.3697 145.0795  6.47293904720634","STELLA","1 22824U 93061B   23109.59804029 -.00000021  00000+0  10498-4 0  9998","2 22824  98.9351 142.8285 0006288 359.1567 131.0523 14.27403022540059","LARES","1 38077U 12006A   23109.24627031 -.00000022  00000+0  10226-3 0  9992","2 38077  69.4932 104.9918 0006725  43.4879 316.6674 12.54931829512271","PROBA-1","1 26958U 01049B   23109.57526880  .00005690  00000+0  46321-3 0  9998","2 26958  97.8672  75.4088 0070326  43.7729 316.9038 14.97988146170200","BIRD 2","1 26959U 01049C   23109.32232521  .00077020  00000+0  85713-3 0  9992","2 26959  97.7671 229.7457 0003413 331.7435  28.3637 15.62610259500576","CUTE-1 (CO-55)","1 27844U 03031E   23108.96516359  .00000760  00000+0  35854-3 0  9990","2 27844  98.6801 117.0867 0008721 301.3045  58.7279 14.22730416 27314","CUBESAT XI-IV (CO-57)","1 27848U 03031J   23108.95599912  .00000646  00000+0  31074-3 0  9992","2 27848  98.6838 117.5154 0008808 317.7895  42.2603 14.22247304 27084","APRIZESAT 4","1 35684U 09041D   23109.32579050  .00001938  00000+0  25749-3 0  9996","2 35684  98.2900 138.2397 0047655  90.1746 270.4925 14.80239472740306","APRIZESAT 3","1 35686U 09041F   23109.20201347  .00002984  00000+0  31005-3 0  9990","2 35686  98.0950 207.6373 0069367 266.3527  92.9754 14.88965338744131","PROBA-2","1 36037U 09059B   23109.80017712  .00000557  00000+0  14411-3 0  9993","2 36037  98.2265 295.7041 0012276 241.5049 118.4912 14.53496392713849","APRIZESAT 5","1 37792U 11044E   23109.24372883  .00001990  00000+0  28642-3 0  9993","2 37792  98.2844 358.0230 0058301 108.4462 252.3097 14.76413787628101","APRIZESAT 6","1 37793U 11044F   23109.60298880  .00001454  00000+0  22944-3 0  9992","2 37793  98.3626 336.4824 0046497 163.8690 224.3110 14.73321341626936","PROBA-V","1 39159U 13021A   23109.07852525  .00000141  00000+0  80635-4 0  9994","2 39159  98.3253 134.0291 0002953 279.4015  80.6830 14.23101326516792","APRIZESAT 7","1 39416U 13066A   23109.44078735  .00002873  00000+0  33441-3 0  9999","2 39416  97.6141  80.1081 0041650  70.5156 290.0552 14.85407257509449","APRIZESAT 8","1 39425U 13066K   23109.39289412  .00002302  00000+0  28674-3 0  9998","2 39425  97.6726  72.2201 0052094 117.6185 243.0332 14.82442398508279","BUGSAT-1 (TITA)","1 40014U 14033E   23109.56133623  .00006408  00000+0  52944-3 0  9998","2 40014  98.1442 125.9134 0029547 101.3132 259.1416 14.98988300481957","SAUDISAT 4","1 40016U 14033G   23109.43450978  .00001673  00000+0  24552-3 0  9994","2 40016  97.6406 292.4688 0046624 227.2620 132.4662 14.76068224475524","APRIZESAT 9","1 40018U 14033J   23109.41173822  .00001391  00000+0  22739-3 0  9996","2 40018  97.7466 269.1844 0069275 311.9272  47.6042 14.70807940473616","APRIZESAT 10","1 40019U 14033K   23109.37165666  .00001147  00000+0  19917-3 0  9992","2 40019  97.8066 259.5713 0083103   1.2314 358.9081 14.67818317472665","TDS 1","1 40076U 14037H   23109.31415394  .00007163  00000+0  78503-3 0  9999","2 40076  98.3522   3.3104 0007087 150.5484 209.6131 14.88060671475142","TIANTUO 2","1 40144U 14053B   23109.80517954  .00017578  00000+0  39020-3 0  9994","2 40144  97.1619 189.0936 0010296 161.5663 341.2896 15.43714064482248","TECHNOSAT","1 42829U 17042E   23109.63189720  .00004500  00000+0  43364-3 0  9991","2 42829  97.3932 310.5748 0014923  65.6522 294.6254 14.93307940313754","HAWK-A","1 43765U 18099H   23109.59118020  .00005595  00000+0  46611-3 0  9997","2 43765  97.5761 174.4597 0012128 328.9741  31.0765 14.98969267238968","HAWK-B","1 43794U 18099AN  23109.25779342  .00005773  00000+0  48078-3 0  9999","2 43794  97.5760 174.1351 0012232 330.6676  29.3859 14.98965749238906","HAWK-C","1 43799U 18099AT  23109.25758615  .00005599  00000+0  46646-3 0  9999","2 43799  97.5759 174.0365 0012107 330.3978  29.6559 14.98966680239654","SAUDISAT 1C","1 27607U 02058C   23109.53882002  .00002460  00000+0  35165-3 0  9994","2 27607  64.5545  84.7084 0073914 236.4461 122.9569 14.77124378 93565","SAUDISAT 2","1 28371U 04025F   23109.79080867  .00000793  00000+0  19513-3 0  9992","2 28371  98.4243  72.9434 0024317 242.1957 117.6794 14.54877674997822","SAUDISAT 3","1 31118U 07012B   23109.73077021  .00000881  00000+0  15618-3 0  9996","2 31118  98.0088  55.0632 0013884 304.1910  55.7979 14.69634368858139"];
export default data;