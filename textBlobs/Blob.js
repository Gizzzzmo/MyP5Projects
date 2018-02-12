class Blob {
    
        constructor(x, y, xtarget, ytarget, structure) {
            this.structure = structure

            this.x = x
            this.y = y
            
            this.xspeed = 0
            this.yspeed = 0

            this.xtarget = xtarget
            this.ytarget = ytarget

            this.r = 10

            this.macc = 300
            this.ffields = []
            this.vfields = []

            this.terminate = false
        }
    
        update(tslf) {
            let xacc = 0
            let yacc = 0

            let xdiff = this.xtarget - this.x
            let ydiff = this.ytarget - this.y

            let speed = sqrt(this.xspeed*this.xspeed, this.yspeed * this.yspeed)

            let dist = sqrt(xdiff*xdiff + ydiff*ydiff)
            
            //if the blob is set to terminate and within .5 distance of its target, remove it from its parents blob-set
            if(this.terminate && dist < .5){
                this.structure.blobs.splice(this.structure.blobs.indexOf(this), 1)
            }

            //base transformation of the velocity into parts parallel and orthogonal to the vector connecting the position and the target
            let nx = xdiff/dist
            let ny = ydiff/dist
            let parallels = this.xspeed * nx/(nx*nx-ny*ny) - this.yspeed * ny/(nx*nx-ny*ny)
            let orths =    -this.xspeed * ny/(nx*nx-ny*ny) + this.yspeed * nx/(nx*nx-ny*ny)
            
            //acceleration variables for the new base
            let parallelacc = 0
            let orthacc = 0
            
            //orthogonal acceleration opposes orthogonal speed
            orthacc = orths > 0 ? -this.macc : this.macc

            // parallel acceleration: if moving away from the target always accelerate towards it,
            // else accelerate as long as there is enough time remaining to decelerate in a manner that makes you stop at the target
            if(parallels < 0)parallelacc = this.macc
            else{
                if(dist/parallels < parallels/this.macc)parallelacc = -this.macc
                else parallelacc = this.macc
            }

            //transforming the base back
            xacc += nx * parallelacc + ny * orthacc
            yacc += ny * parallelacc + nx * orthacc;

            //applying any forcefields
            this.ffields.forEach((field) => {
                let xy = field(this.x, this.y)
                xacc += xy.x
                yacc += xy.y
            })

            this.xspeed += tslf * xacc
            this.yspeed += tslf * yacc
            let xspeed = this.xspeed
            let yspeed = this.yspeed

            //applying any velocityfields
            this.vfields.forEach((field) => {
                let xy = field(this.x, this.y)
                xspeed += xy.x
                yspeed += xy.y
            })

            this.x += xspeed * tslf
            this.y += yspeed * tslf
        }

        addFField(field){
            this.ffields.push(field)
        }

        addVField(field){
            this.vfields.push(field)
        }
    
        show() {
            noFill();
            stroke(0);
            strokeWeight(4);
            stroke(255)
            point(this.x, this.y);
        }
    }