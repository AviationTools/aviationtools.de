
import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class MoveBlock here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class MoveBlock extends Actor
{
    private int x = 300;
    private int y = 0;
    private int angle = Greenfoot.getRandomNumber(159)+21;
    
    private int speedX =3;
    private int speedY =3;
    
    private int side = Greenfoot.getRandomNumber(2);
    private int counter = 500;
    private boolean drag = false;
    private boolean inCell = false;
    protected int type;
    public static boolean gameOver = false;
    
    public MoveBlock() {
        if (side == 0) {
            y=200;
            angle*=(Math.PI/180);
        } else {
            y=200;
            angle+=180;
            angle*=Math.PI;
            angle/=180;
        }
        setLocation(x,y);
    }
    public void act() {
        if (Greenfoot.mouseDragged(this)&&!inCell) {
            MouseInfo mouse=Greenfoot.getMouseInfo();
            x=mouse.getX();
            y=mouse.getY();
        } 
        if (Greenfoot.mousePressed(this)) drag=true;
        if (Greenfoot.mouseClicked(null)) {
            drag=false;
            setLocation((int)x,(int)y);
            if (x<153) {
                if (type==1||type==3) {
                    if (!inCell) {
                        inCell=true;
                    }
                } else {
                    if (type==4)
                    removeMe();
                }
            } else if (x>446) {
                if (type==2||type==3) {
                    if (!inCell) {
                        inCell=true;
                    }
                } else {
                    if (type==4)
                    removeMe();
                }
            }
        }
        checkCollision();
        setLocation(x,y);
    }
    
    private void removeMe() {
        if (type != 4) {
            getWorld().removeObject(this);
        }
    }
    
    public void checkCollision() {
        if (isTouching(CollidingBox.class) || isAtEdge()){
            MouseInfo mouse = Greenfoot.getMouseInfo();
            Greenfoot.stop();
            
            x=mouse.getX();
            y=mouse.getY();
            
            gameOver = true;
        }else{
            gameOver = false;
        }
    }
}
