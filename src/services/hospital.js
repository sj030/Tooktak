export function getMetadata() {
    const dummyData = [
        {
            "name": "건국대학교 이비인후과",
            "attributes": [
                {
                    "name": "확인",
                    "option": "checkbox",
                    "type": "String",
                    "list": ["O", "X"]
                },
                {
                    "name": "No.",
                    "option": "range",
                    "type": "Number"
                },
                {
                    "name": "공유번호",
                    "option": "range",
                    "type": "Number"
                },
                {
                    "name": "환자번호",
                    "option": "range",
                    "type": "Number"
                },
                {
                    "name": "이름",
                    "option": "text",
                    "type": "String"
                },
                {
                    "name": "성별",
                    "option": "checkbox",
                    "type": "String",
                    "list": ["남", "여"]
                },
                {
                    "name": "수집일자",
                    "option": "range",
                    "type": "Date"
                },
                {
                    "name": "나이",
                    "option": "range",
                    "type": "Number"
                },
                {
                    "name": "검진과",
                    "option": "text",
                    "type": "String"
                },
                {
                    "name": "주진단",
                    "option": "text",
                    "type": "String"
                },
                {
                    "name": "주진단 정도",
                    "option": "range",
                    "type": "Number"
                },
                {
                    "name": "왼쪽 청력",
                    "option": "checkbox",
                    "type": "String",
                    "list": ["상", "중", "하"]
                },
                {
                    "name": "오른쪽 청력",
                    "option": "checkbox",
                    "type": "String",
                    "list": ["상", "중", "하"]
                },
                {
                    "name": "참고",
                    "option": "text",
                    "type": "String"
                },
                {
                    "name": "부진단1",
                    "option": "text",
                    "type": "String"
                },
                {
                    "name": "부진단2",
                    "option": "text",
                    "type": "String"
                },
                {
                    "name": "부진단3",
                    "option": "text",
                    "type": "String"
                },
                {
                    "name": "재검시행여부",
                    "option": "checkbox",
                    "type": "String",
                    "list": ["Y", "N"]
                },
                {
                    "name": "재검일자",
                    "option": "range",
                    "type": "Date"
                },
                {
                    "name": "비고",
                    "option": "text",
                    "type": "String"
                },
                {
                    "name": "메모",
                    "option": "text",
                    "type": "String"
                },
                {
                    "name": "최종학력",
                    "option": "checkbox",
                    "type": "String",
                    "list": ["초졸", "중졸", "고졸", "대졸", "대학원졸"]
                },
                {
                    "name": "기저질환",
                    "option": "text",
                    "type": "String"
                },
                {
                    "name": "약물복용",
                    "option": "text",
                    "type": "String"
                }
            ]
        },
        {
            "name": "한양대병원 신경과",
            "attributes": [
                {
                    "name": "S-NO",
                    "option": "range",
                    "type": "Number",
                },
                {
                    "name": "참여날짜",
                    "option": "range",
                    "type": "Date",
                },
                {
                    "name": "성명",
                    "option": "text",
                    "type": "String",
                },
                {
                    "name": "병록번호",
                    "option": "range",
                    "type": "Number"
                },
                {
                    "name": "나이",
                    "option": "range",
                    "type": "Number"
                },
                {
                    "name": "성별",
                    "option": "checkbox",
                    "type": "String",
                    "list": ["남", "여"]
                },
                {
                    "name": "MMSE",
                    "option": "range",
                    "type": "Number"
                },
                {
                    "name": "최종학력",
                    "option": "checkbox",
                    "type": "String",
                    "list": ["초졸", "중졸", "고졸", "대졸", "대학원졸"]
                },
                {
                    "name": "CDT",
                    "option": "range",
                    "type": "Number"
                }
            ]
        },
        {
            "name": "전주",
            "attributes": [
                {
                    "name": "No.",
                    "option": "range",
                    "type": "Number"
                },
                {
                    "name": "데이터 수집 날짜",
                    "option": "range",
                    "type": "Date"
                },
                {
                    "name": "대상자명",
                    "option": "text",
                    "type": "String"
                },
                {
                    "name": "나이",
                    "option": "range",
                    "type": "Number"
                },
                {
                    "name": "성별",
                    "option": "checkbox",
                    "type": "String",
                    "list": ["남", "여"]
                },
                {
                    "name": "최종학력",
                    "option": "checkbox",
                    "type": "String",
                    "list": ["초졸", "중졸", "고졸", "대졸", "대학원졸", "해당없음"]
                },
                {
                    "name": "MMSE",
                    "option": "range",
                    "type": "Number"
                },
                {
                    "name": "청력 정도",
                    "option": "checkbox",
                    "type": "String",
                    "list": ["하", "중", "상"]
                }
            ]
        }
    ];
    return dummyData;
}

export function getFile(filter) {
    const dummyData = {
        "hospital": "건국대학교 이비인후과",
        "attribute": ["확인", "No.", "공유번호", "환자번호", "이름", "성별", "수집일자", "나이", "검진과", "주진단", "주진단 정도", "왼쪽 청력", "오른쪽 청력", "참고", "부진단1", "부진단2", "부진단3", "재검시행여부", "재검일자", "비고", "메모", "최종학력", "기저질환", "약물복용"],
        "file": {
            "1": ["O", 1, 1, 1, "김민수", "남", "2021-10-01", 30, "이비인후과", "감기", "1", "상", "상", "없음", "비염", "비염", "비염", "Y", "2021-10-02", "없음", "없음", "대졸", "없음", "없음"],
            "2": ["O", 2, 2, 2, "문찬규", "남", "2021-10-01", 30, "이비인후과", "감기", "1", "상", "상", "없음", "비염", "비염", "비염", "Y", "2021-10-02", "없음", "없음", "대졸", "없음", "없음"],
            "3": ["O", 3, 3, 3, "김민수", "남", "2021-10-01", 30, "이비인후과", "감기", "1", "상", "상", "없음", "비염", "비염", "비염", "Y", "2021-10-02", "없음", "없음", "대졸", "없음", "없음"],
            "4": ["X", 4, 4, 4, "문찬규", "남", "2021-10-01", 30, "이비인후과", "감기", "1", "상", "상", "없음", "비염", "비염", "비염", "Y", "2021-10-02", "없음", "없음", "대졸", "없음", "없음"],
            "5": ["O", 5, 5, 5, "김민수", "남", "2021-10-01", 30, "이비인후과", "감기", "1", "상", "상", "없음", "비염", "비염", "비염", "Y", "2021-10-02", "없음", "없음", "대졸", "없음", "없음"],
            "6": ["O", 6, 6, 6, "문찬규", "남", "2021-10-01", 30, "이비인후과", "감기", "1", "상", "상", "없음", "비염", "비염", "비염", "Y", "2021-10-02", "없음", "없음", "대졸", "없음", "없음"],
            "7": ["O", 7, 7, 7, "김민수", "남", "2021-10-01", 30, "이비인후과", "감기", "1", "상", "상", "없음", "비염", "비염", "비염", "Y", "2021-10-02", "없음", "없음", "대졸", "없음", "없음"],
        }
    }

    return dummyData;
}