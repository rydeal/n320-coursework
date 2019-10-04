//Ryan Deal
//NEWM 320
//26.9.2019

Vue.component("student-card", {
    props: [ "student", "isactive" ],
    template: "<div class='student' v-bind:class='{ cardActive:isactive, cardOut:!isactive}'>{{ student.name }} : {{ student.skill }}</div>"
})

Vue.component("school-card", {
    props: [ "school", "isactive"],
    template: "<div class='school' v-bind:class='{ schoolCardActive:isactive, schoolCardOut:!isactive}'>{{ school.name }} : {{ school.stars }}</div>"
})



var app = new Vue({
    el: "#app",
    data: {
        students: [
            { name: "Sienna", skill: 2, joy: 0 },
            { name: "Cyan", skill: 0, joy: 5 },
            { name: "Magenta", skill: 3, joy: 3 }
        ],
        currentStudent: { name: "Sienna", skill: 2, joy: 0 },
        curStudentId: 0,
        cardActive: true
    },
    methods: {
        arrowClicked: function() {
            this.cardActive = !this.cardActive;


            setTimeout( () => {
                this.currentStudent.skill++;
                this.curStudentId ++;
                this.currentStudent = this.students[this.curStudentId];
    
                if(this.curStudentId >= this.students.length-1) {
                    this.curStudentId = -1;
                }
                this.cardActive = !this.cardActive;
            }, 300);
        },

        leftArrow: function() {
            this.cardActive = !this.cardActive;
            setTimeout( () => {
                this.currentStudent.skill -= 1;
                /*If statements to switch between each id depending on the previous */
                if(this.curStudentId == 0) {
                    this.curStudentId = 2; 
                } else if(this.curStudentId == -1){
                    this.curStudentId = 1;
                } else if(this.curStudentId == 1) {
                    this.curStudentId = 0;
                }
                this.currentStudent = this.students[this.curStudentId];
    
                if(this.curStudentId >= this.students.length-1) {
                    this.curStudentId = -1;
                }
                this.cardActive = !this.cardActive;
            }, 300);
            console.log(this.curStudentId);
        }
    }
})

var schoolapp = new Vue({
    el: "#schoolapp",
    data: {
        schools: [
            /*IUPUI is the smallest of the 3 schools and has a lower ranking nationally than the other two. Purdue is the highest ranking, but both IU and Purdue are within the top 100.*/
            /*IUPUI is also the smallest of the three schools, and IU is the largest, but the difference
            between IU and Purdue is less than 1000.*/ 
            { name: "IUPUI", stars: 4, size: 4 },
            { name: "IU", stars: 5, size: 5 },
            { name: "Purdue", stars: 5, size: 5 }
        ],
        currentSchool: { name: "IUPUI", stars: 4, size: 4 },
        curSchoolId: 0,
        schoolCardActive: true
    },
    methods: {
        schoolArrowClicked: function() {
            this.schoolCardActive = !this.schoolCardActive;


            setTimeout( () => {
                this.currentSchool.stars++;
                this.curSchoolId ++;
                this.currentSchool = this.schools[this.curSchoolId];
    
                if(this.curSchoolId >= this.schools.length-1) {
                    this.curSchoolId = -1;
                }
                this.schoolCardActive = !this.schoolCardActive;
            }, 300);
            console.log(this.curSchoolId);
        },

        schoolLeftArrow: function() {
            this.schoolCardActive = !this.schoolCardActive;
            setTimeout( () => {
                this.currentSchool.stars -= 1;
                if(this.curSchoolId == 0) {
                    this.curSchoolId = 2;
                } else if(this.curSchoolId == -1){
                    this.curSchoolId = 1;
                } else if(this.curSchoolId == 1) {
                    this.curSchoolId = 0;
                }
                this.currentSchool = this.schools[this.curSchoolId];
                console.log(this.curSchoolId);
                if(this.curSchoolId >= this.schools.length-1) {
                    this.curSchoolId = -1;
                }
                this.schoolCardActive = !this.schoolCardActive;
            }, 300);

        }
    }
})
