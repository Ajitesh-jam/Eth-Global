using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UIElements;

[RequireComponent(typeof(CharacterController))]
public class CharacterManager : MonoBehaviour
{
    public UnityEvent<float> OnDeath;
    public bool IsEnabled { get; set; }
    public bool IsInputEnabled { get; set; }
    public float DistanceTravelled { get; private set; }

    [SerializeField]
    private float _forwardSpeed = 10.0f;

    [SerializeField]
    private float _lateralSpeed = 5.0f;

    [SerializeField]
    private float _rotationSpeed = 5.0f;

    // List of Animators for each bus
    [SerializeField]
    private List<Animator> _animators;

    [SerializeField]
    private List<Transform> _lanesSToSW;

    private int _currentLaneIndex;
    private int _currentBusIndex;
    private Animator _currentAnimator; // Selected animator based on bus

    private CharacterController _characterController;

    public static CharacterManager Instance { get; private set; }

    public void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
            return;
        }

        _characterController = GetComponent<CharacterController>();
    }

    public void Start()
    {
        IsEnabled = false;
        _currentLaneIndex = 0;
        IsInputEnabled = true;

        // Retrieve the selected bus index from PlayerPrefs
        _currentBusIndex = PlayerPrefs.GetInt("SelectedBus", 0);

        // Ensure the bus index is within bounds of the animator list
        if (_currentBusIndex >= 0 && _currentBusIndex < _animators.Count)
        {
            _currentAnimator = _animators[_currentBusIndex];
        }
        else
        {
            Debug.LogError("Selected bus index is out of bounds!");
        }
    }

    public void Update()
    {
        if (IsEnabled)
        {
            HandleInput();
            Move();
            Rotate();
        }
    }

    public void HandleInput()
    {
        if (IsInputEnabled)
        {
            DistanceTravelled += _forwardSpeed * Time.deltaTime;

            // Handle lane switching
            if (Input.GetKeyDown(KeyCode.A))
            {
                _currentLaneIndex--;
                if (_currentLaneIndex < 0)
                    _currentLaneIndex = _lanesSToSW.Count - 1;

                // Trigger the "Roll_Left" animation in the selected animator
                _currentAnimator.SetTrigger("Roll_Left");
            }
            else if (Input.GetKeyDown(KeyCode.D))
            {
                _currentLaneIndex++;
                if (_currentLaneIndex >= _lanesSToSW.Count)
                    _currentLaneIndex = 0;

                // Trigger the "Roll_Right" animation in the selected animator
                _currentAnimator.SetTrigger("Roll_Right");
            }
        }
    }

    public void Move()
    {
        // Target lane position with adjusted Y to match character's current Y position
        Vector3 targetPosition = new Vector3(
            _lanesSToSW[_currentLaneIndex].position.x,
            _lanesSToSW[_currentLaneIndex].position.y,
            _characterController.transform.position.z
        );

        // Smoothly interpolate to the target position
        Vector3 smoothedPosition = Vector3.Slerp(
            _characterController.transform.position,
            targetPosition,
            _lateralSpeed * Time.deltaTime
        );
        _characterController.Move(smoothedPosition - _characterController.transform.position);

        // Apply forward movement
        Vector3 forwardMovement = _forwardSpeed * Time.deltaTime * Vector3.forward;
        _characterController.Move(forwardMovement);
    }

    public void Rotate()
    {
        // Rotate player to match the lane's/wall's orientation
        Quaternion targetRotation = Quaternion.LookRotation(
            Vector3.forward,
            _lanesSToSW[_currentLaneIndex].up
        );
        _characterController.transform.rotation = Quaternion.Slerp(
            _characterController.transform.rotation,
            targetRotation,
            Time.deltaTime * _rotationSpeed
        );
    }

    public int GetLaneIndex()
    {
        return _currentLaneIndex;
    }

    public void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Obstacle"))
        {
            IsEnabled = false;
            IsInputEnabled = false;
            OnDeath?.Invoke(DistanceTravelled);
        }
    }

}
