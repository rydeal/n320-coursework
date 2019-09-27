//Ryan Deal
//NEWM 320
//26.9.2019


// var right = document.getElementsByClassName("arrow");
// var left = document.getElementsByClassName("leftArrow");
// right.addEventListener('click', rightOne());
// left.addEventListener('click', leftOne());

// rightOne() {
Vue.component("student-card", {
    props: [ "student", "isactive" ],
    template: "<div class='student' v-bind:class='{ cardActive:isactive, cardOut:!isactive}'>{{ student.name }} : {{ student.skill }}</div>"
})

// }

// leftOne() {
//     Vue.component("student-card", {
//         props: [ "student", "isactive" ],
//         template: "<div class='student' v-bind:class='{ cardLeft:isactive, cardOut:!isactive}'>{{ student.name }} : {{ student.skill }}</div>"
//     })
    
//}

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
                subt = (int)(Math.random() * 5);
                this.currentStudent.skill -= subt;
                this.curStudentId ++;
                this.currentStudent = this.students[this.curStudentId];
    
                if(this.curStudentId >= this.students.length-1) {
                    this.curStudentId = -1;
                }
                this.cardActive = !this.cardActive;
            }, 300);

        }
    }
})
