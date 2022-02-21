let teams;
(async() => {
    const response = await fetch("http://127.0.0.1:3000/");
    teams = await response.json();
    console.log('ay!!!!!')
    makeCode()
})()

function makeCode() {
    let numTeamsSlider;
    let teams = [];

    class Team {
        constructor(name) {
            this.name = name;
            this.wins = 0;
            this.losses = 0;
        }
    }

    function setup() {
        createCanvas(600, 400);
        numTeamsSlider = createSlider(0, 256, 56, 1);
        numTeamsSlider.style('width', width + 'px');
        numTeamsSlider.input(changeNumTeams);
        fillTeamsList(getNumberNodes(numTeamsSlider.value()));
    }

    function draw() {
        background(220);
        if (numTeamsSlider.value() > 1) line(width / 2, 3 * height / 8, width / 2, 5 * height / 8);
        drawBracketStructure();
        textAlign(CENTER);
        textSize(18);
        text(`Number of Teams: ${numTeamsSlider.value()}`, width / 2, 30);
    }

    function drawBracketStructure() {
        // Draw Left Side of Bracket
        dW = width / (2 * Math.log2(teams.length));
        pdH = height / teams.length;
        for (let round = 0; round < Math.log2(teams.length); round++) {
            dH = height / (teams.length / Math.pow(2, round + 1));
            for (let c = 0; c < teams.length / Math.pow(2, round + 1); c++) {
                line(round * dW, c * dH + pdH, round * dW + dW, c * dH + pdH);
                if (c % 2 == 1) {
                    line(round * dW + dW, (c - 1) * dH + pdH, round * dW + dW, c * dH + pdH);
                }
            }
            pdH = dH;
        }

        // Draw Right Side of Bracket
        dW = width / (2 * Math.log2(teams.length));
        pdH = height / teams.length;
        for (let round = 0; round < Math.log2(teams.length); round++) {
            dH = height / (teams.length / Math.pow(2, round + 1));
            for (let c = 0; c < teams.length / Math.pow(2, round + 1); c++) {
                line(width - round * dW, c * dH + pdH, width - (round * dW + dW), c * dH + pdH);
                if (c % 2 == 1) {
                    line(width - (round * dW + dW), (c - 1) * dH + pdH, width - (round * dW + dW), c * dH + pdH);
                }
            }
            pdH = dH;
        }
    }

    function fillTeamsList(nodes) {
        // Fill teams list with fake teams & byes
        for (let i = 0; i < nodes; i++) {
            if (i < numTeamsSlider.value()) teams.push(new Team(`Team${i+1}`));
            else teams.push(new Team(`Bye${i+1}`));
        }
    }

    function changeNumTeams() {
        teams = [];
        fillTeamsList(getNumberNodes(numTeamsSlider.value()));
    }

    function getNumberNodes(n) {
        return Math.pow(2, Math.ceil(Math.log2(n)));
    }
}