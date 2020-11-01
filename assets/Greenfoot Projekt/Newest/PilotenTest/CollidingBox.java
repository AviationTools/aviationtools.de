import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
* Write a description of class AutoBlocks here.
* 
* @author (your name) 
* @version (a version number or a date)
*/
public class CollidingBox extends Actor
{
    private int x = 0;
    private int y = 0;
    private double speedX = 2;
    private double speedY = 2;
    // private boolean increaseSpeedToggle = false;
    
    private Time time;
    private int tempTime;
    
    private int height;
    private int width;
    
    public CollidingBox(int height, int width, Time time) {
        this.height = height;
        this.width = width;
        this.time = time;
    }
    
    //Auto Loop
    public void act() 
    {
        getImage().scale(width, height);
        action();
    }
    
    public void action() 
    {
        // System.out.println("test");
        x = getX();
        y = getY();
        x += speedX;
        y += speedY;
        
        if(isAtEdge()){
            if (getY() == 0 || getY() == getWorld().getHeight()-1) /** top or bottom */
            {
                if(getY() == 0) {
                    y = y + 10;
                } else {
                    y = y - 10;
                }
                speedX = speedX * (+1);
                speedY = speedY * (-1);
            }
            if (getX()==0 || getX() == getWorld().getWidth()-1) /** left or right */
            {   
                if(getX()==0){
                    x = x + 10;
                }else{
                    x = x - 10;
                }
                speedX = speedX * (-1);
                speedY = speedY * (+1);
            }
        }
        // System.out.println(speedX);
        setLocation(x,y);
        increaseSpeed();
    }
        
    public void increaseSpeed(){
      // Increase AutoBlocks Velocity
      if(time.getTime() > tempTime){
        speedX = (speedX * 1.1);
        speedY = (speedY * 1.1);
        // System.out.println(speedX);
      }
      tempTime = time.getTime();
    }
}
