import {PPAJobResultsGroups, PPAJobSimpleResults, PPAJobSimpleStats} from '../../../ppa-dom';


export function makePPAStats(jobId: number): PPAJobSimpleStats {

  const stats =  {
    jobId: 16134,
    stats: [
    {
      memberDataId: 1,
      rawId: 1,
      bioId: 1,
      envId: 1,
      label: 'WT LHY',
      N: 8,
      ERR: 0.21,
      GOF: 0.37,
      per: 24.38,
      perStd: 0.71,
      ph2Z: {
        m: 5.86,
        f: 5.97,
        p: 5.65,
        a: 5.51
      },
      ph2W: {
        m: 10.24,
        f: 10.35,
        p: 10.03,
        a: 9.89
      },
      ph2ZCir: {
        m: 5.76,
        f: 5.86,
        p: 5.55,
        a: 5.42
      },
      ph2WCir: {
        m: 10.07,
        f: 10.17,
        p: 9.86,
        a: 9.74
      },
      phStd: {
        m: 0.76,
        f: 0.8,
        p: 0.72,
        a: 0.61
      },
      phStdCir: {
        m: 0.65,
        f: 0.67,
        p: 0.59,
        a: 0.51
      },
      amp: {
        m: 0.11,
        f: 0.11,
        p: 0.11,
        a: 0.13
      },
      ampStd: {
        m: 0.02,
        f: 0.01,
        p: 0.01,
        a: 0.01
      }
    },
    {
      memberDataId: 9,
      rawId: 9,
      bioId: 2,
      envId: 2,
      label: 'prr79 LHY',
      N: 8,
      ERR: 0.15,
      GOF: 0.26,
      per: 31.08,
      perStd: 1.3,
      ph2Z: {
        m: 2.26,
        f: 2.47,
        p: 1.6,
        a: 1.68
      },
      ph2W: {
        m: 13.34,
        f: 13.55,
        p: 12.68,
        a: 12.76
      },
      ph2ZCir: {
        m: 1.74,
        f: 1.89,
        p: 1.23,
        a: 1.28
      },
      ph2WCir: {
        m: 10.29,
        f: 10.45,
        p: 9.78,
        a: 9.84
      },
      phStd: {
        m: 1.18,
        f: 1.13,
        p: 0.97,
        a: 1.15
      },
      phStdCir: {
        m: 0.87,
        f: 0.83,
        p: 0.71,
        a: 0.85
      },
      amp: {
        m: 0.24,
        f: 0.24,
        p: 0.24,
        a: 0.27
      },
      ampStd: {
        m: 0.03,
        f: 0.03,
        p: 0.06,
        a: 0.02
      }
    },
    {
      memberDataId: 17,
      rawId: 17,
      bioId: 3,
      envId: 3,
      label: 'WT PRR9',
      N: 8,
      ERR: 0.28,
      GOF: 0.43,
      per: 'NaN',
      perStd: 0.65,
      ph2Z: {
        m: 13.11,
        f: 13.38,
        p: 14.06,
        a: 13.86
      },
      ph2W: {
        m: 17.7,
        f: 17.97,
        p: 18.65,
        a: 18.45
      },
      ph2ZCir: {
        m: 12.8,
        f: 13.07,
        p: 13.72,
        a: 13.53
      },
      ph2WCir: {
        m: 17.28,
        f: 17.55,
        p: 18.2,
        a: 18.01
      },
      phStd: {
        m: 0.73,
        f: 0.68,
        p: 0.98,
        a: 1.4
      },
      phStdCir: {
        m: 0.78,
        f: 0.78,
        p: 1.0,
        a: 1.42
      },
      amp: {
        m: 0.05,
        f: 0.06,
        p: 0.08,
        a: 0.06
      },
      ampStd: {
        m: 0.01,
        f: 0.01,
        p: 0.01,
        a: 0.01
      }
    },
    {
      memberDataId: 25,
      rawId: 25,
      bioId: 4,
      envId: 4,
      label: 'prr79 PRR5',
      N: 8,
      ERR: 0.11,
      GOF: 0.26,
      per: 30.6,
      perStd: 1.3,
      ph2Z: {
        m: 9.98,
        f: 10.04,
        p: 10.18,
        a: 9.98
      },
      ph2W: {
        m: 20.58,
        f: 20.64,
        p: 20.78,
        a: 20.58
      },
      ph2ZCir: {
        m: 7.82,
        f: 7.88,
        p: 7.99,
        a: 7.83
      },
      ph2WCir: {
        m: 16.13,
        f: 16.2,
        p: 16.31,
        a: 16.14
      },
      phStd: {
        m: 1.08,
        f: 1.09,
        p: 1.05,
        a: 1.06
      },
      phStdCir: {
        m: 0.8,
        f: 0.82,
        p: 0.81,
        a: 0.79
      },
      amp: {
        m: 0.15,
        f: 0.15,
        p: 0.16,
        a: 0.15
      },
      ampStd: {
        m: 0.02,
        f: 0.02,
        p: 0.03,
        a: 0.02
      }
    },
    {
      memberDataId: 33,
      rawId: 33,
      bioId: 5,
      envId: 5,
      label: 'WT PRR7',
      N: 7,
      ERR: 0.18,
      GOF: 0.36,
      per: 24.04,
      perStd: 0.65,
      ph2Z: {
        m: 10.02,
        f: 10.17,
        p: 10.43,
        a: 10.06
      },
      ph2W: {
        m: 14.06,
        f: 14.21,
        p: 14.47,
        a: 14.1
      },
      ph2ZCir: {
        m: 10.0,
        f: 10.16,
        p: 10.41,
        a: 10.04
      },
      ph2WCir: {
        m: 14.04,
        f: 14.2,
        p: 14.45,
        a: 14.08
      },
      phStd: {
        m: 0.59,
        f: 0.65,
        p: 0.55,
        a: 0.57
      },
      phStdCir: {
        m: 0.62,
        f: 0.61,
        p: 0.53,
        a: 0.6
      },
      amp: {
        m: 0.17,
        f: 0.17,
        p: 0.18,
        a: 0.19
      },
      ampStd: {
        m: 0.01,
        f: 0.01,
        p: 0.03,
        a: 0.02
      }
    },
    {
      memberDataId: 41,
      rawId: 41,
      bioId: 6,
      envId: 6,
      label: 'prr79 TOC1',
      N: 8,
      ERR: 0.14,
      GOF: 0.3,
      per: 30.42,
      perStd: 1.06,
      ph2Z: {
        m: 18.6,
        f: 18.49,
        p: 18.82,
        a: 19.06
      },
      ph2W: {
        m: 29.02,
        f: 28.91,
        p: 29.24,
        a: 29.48
      },
      ph2ZCir: {
        m: 14.67,
        f: 14.59,
        p: 14.84,
        a: 15.03
      },
      ph2WCir: {
        m: 22.89,
        f: 22.81,
        p: 23.06,
        a: 23.25
      },
      phStd: {
        m: 1.2,
        f: 1.18,
        p: 1.18,
        a: 1.3
      },
      phStdCir: {
        m: 0.66,
        f: 0.68,
        p: 0.62,
        a: 0.71
      },
      amp: {
        m: 0.09,
        f: 0.09,
        p: 0.09,
        a: 0.09
      },
      ampStd: {
        m: 0.01,
        f: 0.01,
        p: 0.01,
        a: 0.01
      }
    },
    {
      memberDataId: 49,
      rawId: 49,
      bioId: 7,
      envId: 7,
      label: 'WT PRR5',
      N: 8,
      ERR: 0.19,
      GOF: 0.34,
      per: 24.12,
      perStd: 0.57,
      ph2Z: {
        m: 13.46,
        f: 13.64,
        p: 14.26,
        a: 13.83
      },
      ph2W: {
        m: 17.58,
        f: 17.76,
        p: 18.38,
        a: 17.95
      },
      ph2ZCir: {
        m: 13.41,
        f: 13.59,
        p: 14.21,
        a: 13.78
      },
      ph2WCir: {
        m: 17.51,
        f: 17.69,
        p: 18.31,
        a: 17.88
      },
      phStd: {
        m: 1.18,
        f: 1.06,
        p: 1.19,
        a: 1.72
      },
      phStdCir: {
        m: 1.36,
        f: 1.22,
        p: 1.36,
        a: 1.89
      },
      amp: {
        m: 0.13,
        f: 0.14,
        p: 0.17,
        a: 0.14
      },
      ampStd: {
        m: 0.01,
        f: 0.02,
        p: 0.02,
        a: 0.02
      }
    },
    {
      memberDataId: 57,
      rawId: 57,
      bioId: 8,
      envId: 8,
      label: 'prr79 XYZ',
      N: 8,
      ERR: 0.13,
      GOF: 0.3,
      per: 31.0,
      perStd: 0.91,
      ph2Z: {
        m: 29.77,
        f: 29.87,
        p: 29.9,
        a: 29.8
      },
      ph2W: {
        m: 9.77,
        f: 9.87,
        p: 9.9,
        a: 9.8
      },
      ph2ZCir: {
        m: 23.04,
        f: 23.11,
        p: 23.14,
        a: 23.06
      },
      ph2WCir: {
        m: 7.56,
        f: 7.63,
        p: 7.66,
        a: 7.58
      },
      phStd: {
        m: 1.52,
        f: 1.61,
        p: 1.62,
        a: 1.55
      },
      phStdCir: {
        m: 0.69,
        f: 0.75,
        p: 0.75,
        a: 0.7
      },
      amp: {
        m: 0.06,
        f: 0.05,
        p: 0.05,
        a: 0.06
      },
      ampStd: {
        m: 0.01,
        f: 0.0,
        p: 0.01,
        a: 0.01
      }
    },
    {
      memberDataId: 65,
      rawId: 65,
      bioId: 9,
      envId: 9,
      label: 'WT TOC1',
      N: 8,
      ERR: 0.14,
      GOF: 0.31,
      per: 24.04,
      perStd: 0.62,
      ph2Z: {
        m: 16.54,
        f: 16.54,
        p: 16.62,
        a: 16.47
      },
      ph2W: {
        m: 20.58,
        f: 20.58,
        p: 20.66,
        a: 20.51
      },
      ph2ZCir: {
        m: 16.5,
        f: 16.51,
        p: 16.59,
        a: 16.44
      },
      ph2WCir: {
        m: 20.54,
        f: 20.55,
        p: 20.63,
        a: 20.48
      },
      phStd: {
        m: 0.84,
        f: 0.85,
        p: 0.79,
        a: 0.86
      },
      phStdCir: {
        m: 0.59,
        f: 0.61,
        p: 0.58,
        a: 0.6
      },
      amp: {
        m: 0.14,
        f: 0.14,
        p: 0.15,
        a: 0.14
      },
      ampStd: {
        m: 0.02,
        f: 0.02,
        p: 0.02,
        a: 0.02
      }
    },
    {
      memberDataId: 73,
      rawId: 73,
      bioId: 10,
      envId: 10,
      label: 'WT XYZ',
      N: 8,
      ERR: 0.11,
      GOF: 0.22,
      per: 24.27,
      perStd: 0.6,
      ph2Z: {
        m: 0.91,
        f: 0.9,
        p: 2.85,
        a: 2.39
      },
      ph2W: {
        m: 5.18,
        f: 5.17,
        p: 7.12,
        a: 6.66
      },
      ph2ZCir: {
        m: 0.89,
        f: 0.88,
        p: 2.82,
        a: 2.36
      },
      ph2WCir: {
        m: 5.11,
        f: 5.1,
        p: 7.04,
        a: 6.59
      },
      phStd: {
        m: 0.54,
        f: 0.52,
        p: 0.72,
        a: 1.05
      },
      phStdCir: {
        m: 0.53,
        f: 0.51,
        p: 0.71,
        a: 1.03
      },
      amp: {
        m: 0.06,
        f: 0.06,
        p: 0.06,
        a: 0.06
      },
      ampStd: {
        m: 0.01,
        f: 0.01,
        p: 0.0,
        a: 0.01
      }
    }
  ]
  } as PPAJobSimpleStats;

  stats.jobId = jobId;
  return stats;
}

export function makePPASimpleResults(): PPAJobSimpleResults {

const res = {
  jobId: 866,
  results: [
    {
      jobId: 866,
      dataId: 1,
      rawId: 1,
      bioId: 1,
      envId: 1,
      orgId: 'B2',
      dataRef: '1. [B2]',
      label: 'noise',
      message: null,
      ignored: true,
      circadian: true,
      attention: false,
      failed: false,
      ERR: 0.95,
      GOF: 0.92,
      dType: 'LIN_DTR',
      summary: null,
      per: 26.65,
      perE: 2.2,
      ph2Z: {
        m: 18.39,
        f: 18.38,
        p: 22.9,
        a: 18.1
      },
      ph2W: {
        m: 18.39,
        f: 18.38,
        p: 22.9,
        a: 18.1
      },
      ph2ZCir: {
        m: 16.56,
        f: 16.55,
        p: 20.62,
        a: 16.3
      },
      ph2WCir: {
        m: 16.56,
        f: 16.55,
        p: 20.62,
        a: 16.3
      },
      phE: 5.3,
      phECir: 4.77,
      amp: {
        m: 0.41,
        f: 0.4,
        p: 1.62,
        a: 1.41
      },
      ampE: 0.385934
    },
    {
      jobId: 866,
      dataId: 2,
      rawId: 2,
      bioId: 2,
      envId: 2,
      orgId: 'B5',
      dataRef: '2. [B5]',
      label: '24 0.1',
      message: null,
      ignored: false,
      circadian: true,
      attention: false,
      failed: false,
      ERR: 0.56,
      GOF: 0.92,
      dType: 'LIN_DTR',
      summary: null,
      per: 21.85,
      perE: 0.87,
      ph2Z: {
        m: 3.19,
        f: 3.12,
        p: 4.2,
        a: 3.68
      },
      ph2W: {
        m: 3.19,
        f: 3.12,
        p: 4.2,
        a: 3.68
      },
      ph2ZCir: {
        m: 3.5,
        f: 3.43,
        p: 4.61,
        a: 4.04
      },
      ph2WCir: {
        m: 3.5,
        f: 3.43,
        p: 4.61,
        a: 4.04
      },
      phE: 2.84,
      phECir: 3.12,
      amp: {
        m: 0.67,
        f: 0.69,
        p: 1.41,
        a: 1.33
      },
      ampE: 0.374411
    },
    {
      jobId: 866,
      dataId: 3,
      rawId: 3,
      bioId: 1,
      envId: 1,
      orgId: 'B6',
      dataRef: '3. [B6]',
      label: 'noise',
      message: null,
      ignored: false,
      circadian: false,
      attention: true,
      failed: false,
      ERR: 0.69,
      GOF: 0.93,
      dType: 'LIN_DTR',
      summary: null,
      per: 2.83,
      perE: 0.02,
      ph2Z: {
        m: 2.66,
        f: 2.66,
        p: 2.7,
        a: 2.71
      },
      ph2W: {
        m: 2.66,
        f: 2.66,
        p: 2.7,
        a: 2.71
      },
      ph2ZCir: {
        m: 22.51,
        f: 22.52,
        p: 22.87,
        a: 22.95
      },
      ph2WCir: {
        m: 22.53,
        f: 22.53,
        p: 22.87,
        a: 22.96
      },
      phE: 0.51,
      phECir: 4.32,
      amp: {
        m: 0.55,
        f: 0.55,
        p: 0.87,
        a: 0.86
      },
      ampE: 0.381581
    },
    {
      jobId: 866,
      dataId: 4,
      rawId: 4,
      bioId: 3,
      envId: 3,
      orgId: 'B9',
      dataRef: '4. [B9]',
      label: '22 0.5',
      message: null,
      ignored: false,
      circadian: true,
      attention: false,
      failed: false,
      ERR: 0.06,
      GOF: 0.48,
      dType: 'LIN_DTR',
      summary: null,
      per: 22.02,
      perE: 0.13,
      ph2Z: {
        m: 21.86,
        f: 21.86,
        p: 21.9,
        a: 21.86
      },
      ph2W: {
        m: 21.86,
        f: 21.86,
        p: 21.9,
        a: 21.86
      },
      ph2ZCir: {
        m: 23.83,
        f: 23.83,
        p: 23.87,
        a: 23.83
      },
      ph2WCir: {
        m: 23.83,
        f: 23.83,
        p: 23.87,
        a: 23.83
      },
      phE: 0.41,
      phECir: 0.45,
      amp: {
        m: 2.57,
        f: 2.57,
        p: 2.57,
        a: 2.57
      },
      ampE: 0.156884
    },
    {
      jobId: 866,
      dataId: 5,
      rawId: 5,
      bioId: 3,
      envId: 3,
      orgId: 'B10',
      dataRef: '5. [B10]',
      label: '22 0.5',
      message: null,
      ignored: false,
      circadian: true,
      attention: false,
      failed: false,
      ERR: 0.08,
      GOF: 0.44,
      dType: 'LIN_DTR',
      summary: null,
      per: 21.97,
      perE: 0.13,
      ph2Z: {
        m: 21.91,
        f: 21.91,
        p: 0.2,
        a: 21.92
      },
      ph2W: {
        m: 21.91,
        f: 21.91,
        p: 0.2,
        a: 21.92
      },
      ph2ZCir: {
        m: 23.93,
        f: 23.93,
        p: 0.22,
        a: 23.95
      },
      ph2WCir: {
        m: 23.93,
        f: 23.93,
        p: 0.22,
        a: 23.95
      },
      phE: 0.39,
      phECir: 0.43,
      amp: {
        m: 2.64,
        f: 2.62,
        p: 2.59,
        a: 2.68
      },
      ampE: 0.206204
    },
    {
      jobId: 866,
      dataId: 6,
      rawId: 6,
      bioId: 4,
      envId: 4,
      orgId: 'B13',
      dataRef: '6. [B13]',
      label: '24 05',
      message: null,
      ignored: false,
      circadian: true,
      attention: false,
      failed: false,
      ERR: 0.06,
      GOF: 0.49,
      dType: 'LIN_DTR',
      summary: null,
      per: 23.81,
      perE: 0.16,
      ph2Z: {
        m: 0.44,
        f: 0.43,
        p: 0.4,
        a: 0.44
      },
      ph2W: {
        m: 0.44,
        f: 0.43,
        p: 0.4,
        a: 0.44
      },
      ph2ZCir: {
        m: 0.44,
        f: 0.43,
        p: 0.4,
        a: 0.44
      },
      ph2WCir: {
        m: 0.44,
        f: 0.43,
        p: 0.4,
        a: 0.44
      },
      phE: 0.46,
      phECir: 0.46,
      amp: {
        m: 2.38,
        f: 2.38,
        p: 2.38,
        a: 2.38
      },
      ampE: 0.149028
    },
    {
      jobId: 866,
      dataId: 7,
      rawId: 7,
      bioId: 5,
      envId: 5,
      orgId: 'B14',
      dataRef: '7. [B14]',
      label: '24 0.5',
      message: null,
      ignored: false,
      circadian: true,
      attention: false,
      failed: false,
      ERR: 0.3,
      GOF: 0.84,
      dType: 'LIN_DTR',
      summary: null,
      per: 24.49,
      perE: 0.56,
      ph2Z: {
        m: 22.71,
        f: 22.79,
        p: 21.8,
        a: 22.96
      },
      ph2W: {
        m: 22.71,
        f: 22.79,
        p: 21.8,
        a: 22.96
      },
      ph2ZCir: {
        m: 22.26,
        f: 22.33,
        p: 21.36,
        a: 22.5
      },
      ph2WCir: {
        m: 22.26,
        f: 22.33,
        p: 21.36,
        a: 22.5
      },
      phE: 1.53,
      phECir: 1.5,
      amp: {
        m: 1.07,
        f: 1.12,
        p: 1.85,
        a: 1.7
      },
      ampE: 0.322891
    },
    {
      jobId: 867,
      dataId: 8,
      rawId: 8,
      bioId: 5,
      envId: 5,
      orgId: 'B20',
      dataRef: '8. [B20]',
      label: 'noise',
      message: 'Period 27.4 is not stat. significant, pval: 0.89',
      ignored: true,
      circadian: false,
      attention: false,
      failed: true,
      ERR: 1.0,
      GOF: 1.0,
      dType: 'LIN_DTR',
      summary: null,
      per: 0.0,
      perE: 0.0,
      ph2Z: {
        m: 0.0,
        f: 0.0,
        p: 0.0,
        a: 0.0
      },
      ph2W: {
        m: 0.0,
        f: 0.0,
        p: 0.0,
        a: 0.0
      },
      ph2ZCir: {
        m: 'NaN',
        f: 'NaN',
        p: 'NaN',
        a: 'NaN'
      },
      ph2WCir: {
        m: 'NaN',
        f: 'NaN',
        p: 'NaN',
        a: 'NaN'
      },
      phE: 0.0,
      phECir: 'NaN',
      amp: {
        m: 0.0,
        f: 0.0,
        p: 0.0,
        a: 0.0
      },
      ampE: 0.0
    }

  ]
} as PPAJobSimpleResults;
return res;
}

export function makePPAGroupResults(): PPAJobResultsGroups {

  const res = {
    jobId: 867,
    periodMin: 18.0,
    periodMax: 34.0,
    groups: [
      {
        memberDataId: 1,
        rawId: 1,
        bioId: 1,
        envId: 1,
        label: 'noise',
        failures: 1,
        excluded: 1,
        periods: [

        ],
        phases2Z: {
          m: [

          ],
          f: [

          ],
          p: [

          ],
          a: [

          ]
        },
        phases2W: {
          m: [

          ],
          f: [

          ],
          p: [

          ],
          a: [

          ]
        },
        phases2ZCir: {
          m: [

          ],
          f: [

          ],
          p: [

          ],
          a: [

          ]
        },
        phases2WCir: {
          m: [

          ],
          f: [

          ],
          p: [

          ],
          a: [

          ]
        },
        amps: {
          m: [

          ],
          f: [

          ],
          p: [

          ],
          a: [

          ]
        }
      },
      {
        memberDataId: 2,
        rawId: 2,
        bioId: 2,
        envId: 2,
        label: '24 0.1',
        failures: 0,
        excluded: 0,
        periods: [
          23.1
        ],
        phases2Z: {
          m: [
            1.49
          ],
          f: [
            1.49
          ],
          p: [
            3.9
          ],
          a: [
            0.43
          ]
        },
        phases2W: {
          m: [
            1.49
          ],
          f: [
            1.49
          ],
          p: [
            3.9
          ],
          a: [
            0.43
          ]
        },
        phases2ZCir: {
          m: [
            1.55
          ],
          f: [
            1.55
          ],
          p: [
            4.05
          ],
          a: [
            0.45
          ]
        },
        phases2WCir: {
          m: [
            1.55
          ],
          f: [
            1.55
          ],
          p: [
            4.05
          ],
          a: [
            0.45
          ]
        },
        amps: {
          m: [
            0.946885
          ],
          f: [
            0.946885
          ],
          p: [
            4.501
          ],
          a: [
            4.109
          ]
        }
      },
      {
        memberDataId: 4,
        rawId: 4,
        bioId: 3,
        envId: 3,
        label: '22 0.5',
        failures: 0,
        excluded: 0,
        periods: [
          22.14,
          22.04
        ],
        phases2Z: {
          m: [
            21.92,
            21.92
          ],
          f: [
            21.92,
            21.92
          ],
          p: [
            20.9,
            20.2
          ],
          a: [
            20.59,
            20.79
          ]
        },
        phases2W: {
          m: [
            21.92,
            21.92
          ],
          f: [
            21.92,
            21.92
          ],
          p: [
            20.9,
            20.2
          ],
          a: [
            20.59,
            20.79
          ]
        },
        phases2ZCir: {
          m: [
            23.76,
            23.87
          ],
          f: [
            23.76,
            23.87
          ],
          p: [
            22.66,
            22.0
          ],
          a: [
            22.32,
            22.64
          ]
        },
        phases2WCir: {
          m: [
            23.76,
            23.87
          ],
          f: [
            23.76,
            23.87
          ],
          p: [
            22.66,
            22.0
          ],
          a: [
            22.32,
            22.64
          ]
        },
        amps: {
          m: [
            2.43,
            2.71
          ],
          f: [
            2.43,
            2.71
          ],
          p: [
            3.942,
            4.713
          ],
          a: [
            3.782,
            4.355
          ]
        }
      },
      {
        memberDataId: 6,
        rawId: 6,
        bioId: 4,
        envId: 4,
        label: '24 05',
        failures: 0,
        excluded: 0,
        periods: [
          23.9
        ],
        phases2Z: {
          m: [
            0.37
          ],
          f: [
            0.37
          ],
          p: [
            2.8
          ],
          a: [
            2.23
          ]
        },
        phases2W: {
          m: [
            0.37
          ],
          f: [
            0.37
          ],
          p: [
            2.8
          ],
          a: [
            2.23
          ]
        },
        phases2ZCir: {
          m: [
            0.37
          ],
          f: [
            0.37
          ],
          p: [
            2.81
          ],
          a: [
            2.24
          ]
        },
        phases2WCir: {
          m: [
            0.37
          ],
          f: [
            0.37
          ],
          p: [
            2.81
          ],
          a: [
            2.24
          ]
        },
        amps: {
          m: [
            2.527
          ],
          f: [
            2.527
          ],
          p: [
            4.091
          ],
          a: [
            4.203
          ]
        }
      },
      {
        memberDataId: 7,
        rawId: 7,
        bioId: 5,
        envId: 5,
        label: '24 0.5',
        failures: 0,
        excluded: 0,
        periods: [
          25.24
        ],
        phases2Z: {
          m: [
            22.94
          ],
          f: [
            22.94
          ],
          p: [
            19.3
          ],
          a: [
            22.18
          ]
        },
        phases2W: {
          m: [
            22.94
          ],
          f: [
            22.94
          ],
          p: [
            19.3
          ],
          a: [
            22.18
          ]
        },
        phases2ZCir: {
          m: [
            21.81
          ],
          f: [
            21.81
          ],
          p: [
            18.35
          ],
          a: [
            21.09
          ]
        },
        phases2WCir: {
          m: [
            21.81
          ],
          f: [
            21.81
          ],
          p: [
            18.35
          ],
          a: [
            21.09
          ]
        },
        amps: {
          m: [
            1.103
          ],
          f: [
            1.103
          ],
          p: [
            4.226
          ],
          a: [
            4.2
          ]
        }
      }
    ]
  } as PPAJobResultsGroups;
  return res;
}
