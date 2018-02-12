class Structure{
    constructor(blobs){
        this.blobs = blobs
        this.ffields = []
        this.vfields = []
    }

    addFField(field){
        this.ffields.push(field)
        this.blobs.forEach((blob) => {
            blob.addFField(field)
        })
    }

    addVField(field){
        this.vfields.push(field)
        this.blobs.forEach((blob) => {
            blob.addVField(field)
        })
    }

    setTarget(pts){
        //make sure that any moving points that are set to terminate are reset not to terminate
        this.blobs.forEach((blob) => {
            blob.terminate = false
        })

        //if there aren't enough blobs for the new structure create new ones at some randomly selected already existing one,
        //or if there doesn't exist one pick a completely arbitrary position within the bounds
        if(pts.length > this.blobs.length){
            for(let i = this.blobs.length;i < pts.length;i++){
                if(this.blobs.length == 0){
                    let x = random()*width
                    let y = random()*height
                    let blob = new Blob(x, y, x, y, this)

                    this.ffields.forEach((field) => {
                        blob.addFField(field)
                    })
                    this.vfields.forEach((field) => {
                        blob.addVField(field)
                    })
                    this.blobs.push(blob)
                }
                else{
                    let j = floor(random()*this.blobs.length)
                    let cc = this.blobs[j]
                    let blob = new Blob(cc.x, cc.y, cc.x, cc.y, this)
                    this.ffields.forEach((field) => {
                        blob.addFField(field)
                    })
                    this.vfields.forEach((field) => {
                        blob.addVField(field)
                    })
                    this.blobs.push(blob)
                }
            }
        }
        //if there are enough blobs set those, which are to many to terminate once they have reached their target
        else{
            for(let i = this.blobs.length;i > pts.length;i--){
                this.blobs[i-1].terminate = true
            }
        }
        //set the new target location for all blobs
        for(let i = 0;i < this.blobs.length;i++){
            if(i < pts.length){
                this.blobs[i].xtarget = pts[i].x
                this.blobs[i].ytarget = pts[i].y
            }
            else {
                let j = floor(random()*pts.length)
                this.blobs[i].xtarget = pts[j].x
                this.blobs[i].ytarget = pts[j].y
            }
        }
    }

    update(tslf){
        this.blobs.forEach((b) => {
            b.update(tslf)
        })
    }

    show(){
        this.blobs.forEach((b) => {
            b.show()
        })
    }
}